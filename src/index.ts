import 'dotenv/config';
import { Blockchain } from './core/blockchain';
import { P2PNetwork } from './network/p2p';
import { CortexMiner } from './mining/miner';
import { CortexMiningPool } from './pool/pool';
import { CortexStratumServer } from './pool/stratum';
import { createApiServer } from './server/api';
import { CortexCrypto } from './core/crypto';

// Default configuration
const HTTP_PORT = Number(process.env.HTTP_PORT) || 3000;
const P2P_PORT = Number(process.env.P2P_PORT) || 6001;
const STRATUM_PORT = Number(process.env.STRATUM_PORT) || 3333;
const PEERS = process.env.PEERS ? process.env.PEERS.split(',') : [];

const blockchain = new Blockchain();
const poolPrivKey = process.env.POOL_PRIVATE_KEY;
const pool = new CortexMiningPool(blockchain, poolPrivKey);
const stratumServer = new CortexStratumServer(pool, STRATUM_PORT);
const MINER_ADDRESS = process.env.MINER_ADDRESS || pool.getPoolAddress();
const miner = new CortexMiner(blockchain, MINER_ADDRESS);
const p2p = new P2PNetwork(blockchain, P2P_PORT, PEERS);

import https from 'https';

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || '';

function notifyDiscordBlock(block: any, source: string = 'Node Miner') {
    if (!DISCORD_WEBHOOK_URL) return;
    try {
        const shortMiner = `${block.minerAddress.substring(0, 10)}...${block.minerAddress.substring(block.minerAddress.length - 6)}`;
        const shortHash = `${block.hash.substring(0, 16)}...`;
        const memoryCount = block.transactions.filter((t: any) => t.type === 'MEMORY_COMMIT').length;

        const payload = JSON.stringify({
            username: 'Reticulum AI Network',
            avatar_url: 'https://reticulum-ai.xyz/assets/reticulum_r_monogram.png',
            embeds: [{
                title: `💎 Block #${block.index} Confirmed on Layer-1`,
                description: `Successfully mined via **RandomX CPU PoW** by \`${source}\`\n[View Block on Explorer](https://reticulum-ai.xyz)`,
                color: 0xef4444,
                fields: [
                    { name: 'Block Hash', value: `\`${shortHash}\``, inline: true },
                    { name: 'Difficulty', value: `\`${block.difficulty}\``, inline: true },
                    { name: 'Reward', value: `**+50 $RAIX**`, inline: true },
                    { name: 'Miner Address', value: `[\`${shortMiner}\`](https://reticulum-ai.xyz/#leaderboard)`, inline: true },
                    { name: 'Transactions', value: `\`${block.transactions.length} txs\``, inline: true },
                    { name: 'AI States Anchored', value: `\`${memoryCount} states\``, inline: true }
                ],
                footer: { text: 'Reticulum AI • Autonomous Swarm Intelligence' },
                timestamp: new Date().toISOString()
            }]
        });

        const req = https.request(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        });
        req.on('error', () => {});
        req.write(payload);
        req.end();
    } catch(e) {}
}

// Hook miner & pool to broadcast new blocks to P2P network and Discord
miner.onBlockFound((block) => {
    console.log(`\n💎 [MINED] Block #${block.index} successfully mined! Hash: ${block.hash.substring(0, 16)}...`);
    p2p.broadcastBlock(block);
    notifyDiscordBlock(block, 'Solo CPU Miner');
});

pool.onBlockFound((block) => {
    console.log(`\n🎉 [POOL MINED] Block #${block.index} successfully solved by pool worker!`);
    p2p.broadcastBlock(block);
    stratumServer.broadcastCurrentJob();
    notifyDiscordBlock(block, 'P2P Mining Pool Worker');
});

// Start Stratum TCP Mining Server
stratumServer.start();

// Start P2P
p2p.startServer();
console.log(`[P2P] WebSocket P2P Server listening on port ${P2P_PORT}`);

// Start REST / Web API
const app = createApiServer(blockchain, p2p, miner, pool, HTTP_PORT);
app.listen(HTTP_PORT, () => {
    console.log(`[HTTP] Web Dashboard & API live at http://localhost:${HTTP_PORT}`);
    console.log(`[WALLET] Default Miner Address: ${MINER_ADDRESS}`);
    console.log(`[POOL] P2P Collaborative Mining Pool initialized at ${pool.getPoolAddress()}`);
    
    // In production validator nodes, heavy CPU mining is offloaded to external workers/pool
    // so the Node.js event loop and CPU remain 100% responsive for the Web Dashboard, Leaderboard & DEX.
    if (process.env.ENABLE_NODE_MINING === 'true') {
        miner.startContinuousMining();
        console.log(`[MINER] Background CPU Mining active (ENABLE_NODE_MINING=true)`);
    } else {
        console.log(`[MINER] Main node CPU mining disabled (0% event loop overhead, optimal API performance)`);
    }
    console.log(`[STATUS] Node is ready to process AI memories and validate blocks.`);
    console.log('====================================================\n');
});
