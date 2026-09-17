"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiServer = createApiServer;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const crypto_1 = require("../core/crypto");
const transaction_1 = require("../core/transaction");
function createApiServer(blockchain, p2p, miner, port = 3000) {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // Serve static frontend files
    const webDir = path_1.default.join(__dirname, '../web');
    app.use(express_1.default.static(webDir));
    // --- BLOCKCHAIN ENDPOINTS ---
    app.get('/api/stats', (req, res) => {
        const stats = blockchain.getStats();
        const minerStats = miner.getStats();
        const p2pStats = p2p.getNetworkStats();
        res.json({
            ...stats,
            miner: minerStats,
            network: p2pStats
        });
    });
    app.get('/api/blocks', (req, res) => {
        const limit = Math.min(100, Number(req.query.limit) || 20);
        const reversed = [...blockchain.chain].reverse().slice(0, limit);
        res.json(reversed);
    });
    app.get('/api/blocks/:identifier', (req, res) => {
        const id = req.params.identifier;
        let block;
        if (!isNaN(Number(id))) {
            block = blockchain.chain[Number(id)];
        }
        else {
            block = blockchain.chain.find(b => b.hash === id);
        }
        if (!block) {
            return res.status(404).json({ error: 'Block not found' });
        }
        res.json(block);
    });
    app.get('/api/mempool', (req, res) => {
        res.json(blockchain.mempool.getAll());
    });
    app.get('/api/balance/:address', (req, res) => {
        const address = req.params.address;
        const balance = blockchain.getBalance(address);
        const nonce = blockchain.getNextNonce(address);
        res.json({ address, balance, nonce });
    });
    // --- CHART METRICS ENDPOINT ---
    app.get('/api/chart/metrics', (req, res) => {
        const recentBlocks = blockchain.chain.slice(-20);
        const labels = recentBlocks.map(b => `#${b.index}`);
        const difficulties = recentBlocks.map(b => b.difficulty);
        const txCounts = recentBlocks.map(b => b.transactions.length);
        const timestamps = recentBlocks.map(b => b.timestamp);
        const miners = recentBlocks.map(b => b.minerAddress);
        const memoryCounts = recentBlocks.map(b => b.transactions.filter(t => t.type === 'MEMORY_COMMIT').length);
        const blockTimes = [];
        for (let i = 0; i < recentBlocks.length; i++) {
            if (i === 0) {
                blockTimes.push(15);
            }
            else {
                const deltaSec = Math.max(1, Math.round((recentBlocks[i].timestamp - recentBlocks[i - 1].timestamp) / 1000));
                blockTimes.push(Math.min(120, deltaSec));
            }
        }
        res.json({
            labels,
            difficulties,
            txCounts,
            timestamps,
            miners,
            memoryCounts,
            blockTimes,
            currentHashrate: miner.getStats().hashrate || 0
        });
    });
    // --- AI MEMORY & SEMANTIC SEARCH ENDPOINTS ---
    app.get('/api/memories', (req, res) => {
        const { agentId, topic, memoryType } = req.query;
        const memories = blockchain.queryMemories({
            agentId: agentId,
            topic: topic,
            memoryType: memoryType
        });
        res.json(memories);
    });
    // SEMANTIC VECTOR SEARCH (COSINE SIMILARITY TOP-K)
    app.get('/api/memories/search', (req, res) => {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ error: 'Search query "q" parameter is required.' });
        }
        const topK = Math.min(20, Number(req.query.topK) || 5);
        const results = blockchain.searchSemanticMemories(query, topK);
        res.json(results);
    });
    // MERKLE PROOF GENERATOR
    app.get('/api/memories/proof/:txId', (req, res) => {
        const txId = req.params.txId;
        const proof = blockchain.getMemoryMerkleProof(txId);
        if (!proof.found) {
            return res.status(404).json(proof);
        }
        res.json(proof);
    });
    app.post('/api/memory/commit', (req, res) => {
        try {
            const body = req.body || {};
            const { agentPrivateKey, agentId, topic, content, memoryType = 'KNOWLEDGE_BASE', fee = 0.05 } = body;
            if (!agentPrivateKey || !agentId || !content || !topic) {
                return res.status(400).json({ error: 'agentPrivateKey, agentId, topic, and content are required.' });
            }
            const keyPair = crypto_1.ReticulumCrypto.fromPrivateKey(agentPrivateKey);
            const balance = blockchain.getBalance(keyPair.address);
            if (balance < fee) {
                return res.status(400).json({ error: `Insufficient RAIX balance. Required: ${fee} RAI, Available: ${balance} RAIX` });
            }
            const vectorHash = crypto_1.ReticulumCrypto.sha256(content);
            const payload = {
                agentId,
                agentPublicKey: keyPair.publicKey,
                memoryType,
                topic,
                content,
                vectorHash,
                accessLevel: 'PUBLIC'
            };
            const nonce = blockchain.getNextNonce(keyPair.address);
            const tx = transaction_1.Transaction.createMemoryCommit(keyPair.address, keyPair.publicKey, payload, fee, nonce);
            tx.sign(keyPair.privateKey, keyPair.publicKey);
            const result = blockchain.mempool.addTransaction(tx);
            if (!result.success) {
                return res.status(400).json({ error: result.error });
            }
            p2p.broadcastTransaction(tx);
            res.json({ success: true, txId: tx.id, memoryPayload: payload });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    // --- TESTNET FAUCET ENDPOINT ---
    const faucetClaims = new Map();
    const FAUCET_PRIVATE_KEY = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'; // Master Testnet Treasury
    const FAUCET_KEYPAIR = crypto_1.ReticulumCrypto.fromPrivateKey(FAUCET_PRIVATE_KEY);
    app.post('/api/faucet', (req, res) => {
        try {
            const body = req.body || {};
            const { address } = body;
            const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
            if (!address || !address.startsWith('ctx1') || address.length < 20) {
                return res.status(400).json({ error: 'Please provide a valid Reticulum address starting with ctx1...' });
            }
            const now = Date.now();
            const lastClaimTime = faucetClaims.get(address.toLowerCase()) || faucetClaims.get(clientIp) || 0;
            const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes
            if (now - lastClaimTime < COOLDOWN_MS) {
                const remainingSec = Math.ceil((COOLDOWN_MS - (now - lastClaimTime)) / 1000);
                return res.status(429).json({ error: `Faucet rate limited. Please wait ${remainingSec}s before requesting again.` });
            }
            const FAUCET_AMOUNT = 5.00;
            const fee = 0.01;
            const nonce = blockchain.getNextNonce(FAUCET_KEYPAIR.address);
            const tx = new transaction_1.Transaction({
                type: 'TRANSFER',
                sender: FAUCET_KEYPAIR.address,
                senderPublicKey: FAUCET_KEYPAIR.publicKey,
                recipient: address.trim(),
                amount: FAUCET_AMOUNT,
                fee: fee,
                burnAmount: 0,
                nonce: nonce,
                timestamp: now
            });
            tx.sign(FAUCET_KEYPAIR.privateKey, FAUCET_KEYPAIR.publicKey);
            const poolRes = blockchain.mempool.addTransaction(tx);
            if (!poolRes.success) {
                return res.status(400).json({ error: poolRes.error });
            }
            faucetClaims.set(address.toLowerCase(), now);
            faucetClaims.set(clientIp, now);
            p2p.broadcastTransaction(tx);
            res.json({
                success: true,
                message: `5.00 Testnet $RAIX sent successfully to ${address}!`,
                txId: tx.id,
                amount: FAUCET_AMOUNT
            });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    app.post('/api/wallet/create', (req, res) => {
        const keyPair = crypto_1.ReticulumCrypto.generateKeyPair();
        res.json({
            address: keyPair.address,
            publicKey: keyPair.publicKey,
            privateKey: keyPair.privateKey
        });
    });
    app.post('/api/wallet/import', (req, res) => {
        try {
            const body = req.body || {};
            const { privateKey } = body;
            if (!privateKey) {
                return res.status(400).json({ error: 'privateKey is required.' });
            }
            const keyPair = crypto_1.ReticulumCrypto.fromPrivateKey(privateKey.trim());
            const balance = blockchain.getBalance(keyPair.address);
            res.json({
                address: keyPair.address,
                publicKey: keyPair.publicKey,
                privateKey: keyPair.privateKey,
                balance
            });
        }
        catch (err) {
            res.status(400).json({ error: 'Invalid private key format.' });
        }
    });
    app.post('/api/transactions/send', (req, res) => {
        try {
            const body = req.body || {};
            const { privateKey, recipient, amount, fee = 0.01 } = body;
            if (!privateKey || !recipient || !amount || Number(amount) <= 0) {
                return res.status(400).json({ error: 'privateKey, recipient and positive amount are required.' });
            }
            const keyPair = crypto_1.ReticulumCrypto.fromPrivateKey(privateKey);
            const balance = blockchain.getBalance(keyPair.address);
            const totalRequired = Number(amount) + Number(fee);
            if (balance < totalRequired) {
                return res.status(400).json({
                    error: `Insufficient balance. Required: ${totalRequired} RAI, Available: ${balance} RAIX`
                });
            }
            const nonce = blockchain.getNextNonce(keyPair.address);
            const tx = new transaction_1.Transaction({
                type: 'TRANSFER',
                sender: keyPair.address,
                senderPublicKey: keyPair.publicKey,
                recipient: recipient.trim(),
                amount: Number(amount),
                fee: Number(fee),
                burnAmount: 0,
                nonce: nonce,
                timestamp: Date.now()
            });
            tx.sign(keyPair.privateKey, keyPair.publicKey);
            const poolRes = blockchain.mempool.addTransaction(tx);
            if (!poolRes.success) {
                return res.status(400).json({ error: poolRes.error });
            }
            p2p.broadcastTransaction(tx);
            res.json({ success: true, txId: tx.id, transaction: tx });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    // --- MINING CONTROL ENDPOINTS ---
    app.get('/api/miner/stats', (req, res) => {
        res.json(miner.getStats());
    });
    app.post('/api/miner/start', (req, res) => {
        const body = req.body || {};
        const { minerAddress } = body;
        if (minerAddress) {
            miner.setMinerAddress(minerAddress);
        }
        miner.startContinuousMining();
        res.json({ success: true, message: 'Mining started', stats: miner.getStats() });
    });
    app.post('/api/miner/stop', (req, res) => {
        miner.stopMining();
        res.json({ success: true, message: 'Mining stopped', stats: miner.getStats() });
    });
    app.post('/api/miner/mine-one', async (req, res) => {
        const body = req.body || {};
        const { minerAddress } = body;
        if (minerAddress) {
            miner.setMinerAddress(minerAddress);
        }
        const result = await miner.mineNextBlockAsync(200000);
        if (result.success && result.block) {
            p2p.broadcastBlock(result.block);
        }
        res.json(result);
    });
    // --- P2P NETWORK ENDPOINTS ---
    app.get('/api/p2p/status', (req, res) => {
        res.json(p2p.getNetworkStats());
    });
    app.post('/api/p2p/connect', (req, res) => {
        const body = req.body || {};
        const { peer } = body;
        if (!peer) {
            return res.status(400).json({ error: 'peer URL is required' });
        }
        p2p.connectToPeer(peer);
        res.json({ success: true, message: `Connecting to ${peer}` });
    });
    return app;
}
