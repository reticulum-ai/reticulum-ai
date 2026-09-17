/**
 * =========================================================================
 * CORTEX PROTOCOL (L1) - BLACK BOX FLIGHT RECORDER SDK FOR AI AGENTS
 * =========================================================================
 * Allows any autonomous AI agent (ElizaOS, LangChain, CrewAI, AutoGen)
 * to immutably commit its decisions, prompt hashes, and audit trails
 * directly on the decentralized Cortex PoW Layer-1 blockchain.
 *
 * Requirements: Node.js 18+ (uses native fetch)
 */

const crypto = require('crypto');

class CortexFlightRecorder {
    /**
     * @param {string} nodeUrl - Cortex Protocol RPC/API endpoint (default: public testnet)
     * @param {string} agentPrivateKey - 64-char hex private key (optional, uses faucet if omitted)
     */
    constructor(nodeUrl = 'https://cortexprotocol.org', agentPrivateKey = null) {
        this.nodeUrl = nodeUrl.replace(/\/$/, '');
        this.agentPrivateKey = agentPrivateKey;
    }

    /**
     * Record an immutable decision / flight log on-chain
     * @param {Object} options
     * @param {string} options.agentId - Name or ID of your autonomous agent (e.g. "Trading-Bot-V2")
     * @param {string} options.action - Short category (e.g. "DEX_SWAP", "RISK_AUDIT", "ORDER_ROUTING")
     * @param {string|Object} options.decision - Clear summary of the decision, inputs and rationale
     * @param {string} [options.memoryType] - "KNOWLEDGE_BASE" | "EPISODIC" | "PROCEDURAL"
     * @returns {Promise<{success: boolean, txId: string, blockHash?: string, vectorHash: string}>}
     */
    async recordDecision({ agentId, action, decision, memoryType = 'PROCEDURAL' }) {
        if (!agentId || !action || !decision) {
            throw new Error('agentId, action, and decision are mandatory fields.');
        }

        const contentString = typeof decision === 'object' ? JSON.stringify(decision) : String(decision);
        
        // Compute deterministic cryptographic proof (SHA-256)
        const vectorHash = crypto.createHash('sha256').update(contentString).digest('hex');

        console.log(`[Cortex FlightRecorder] Anchoring decision for agent "${agentId}"...`);
        console.log(`[Cortex FlightRecorder] Action: ${action} | Hash: ${vectorHash.substring(0, 16)}...`);

        const payload = {
            agentId,
            topic: `FlightRecord: ${action}`,
            memoryType,
            content: contentString,
            agentPrivateKey: this.agentPrivateKey || undefined,
            fee: 0.05
        };

        const response = await fetch(`${this.nodeUrl}/api/memory/commit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Failed to commit flight record: ${err}`);
        }

        const result = await response.json();
        console.log(`[Cortex FlightRecorder] ✓ Decision sealed in mempool! TxID: ${result.txId}`);
        console.log(`[Cortex FlightRecorder] Awaiting PoW miners to seal in next Cortex block.`);

        return {
            success: true,
            txId: result.txId,
            vectorHash,
            agentAddress: result.agentAddress
        };
    }
}

// -------------------------------------------------------------------------
// Example Usage
// -------------------------------------------------------------------------
if (require.main === module) {
    async function demo() {
        const recorder = new CortexFlightRecorder('http://localhost:3000');

        try {
            const record = await recorder.recordDecision({
                agentId: 'Nexus-Quant-Agent',
                action: 'DEFI_ARBITRAGE_EXECUTION',
                decision: {
                    pair: 'ETH/USDC',
                    slippageLimit: 0.005,
                    reason: 'Spatial spread 3.8% between Uniswap v3 and Curve pool detected. Approved order execution.',
                    timestamp: new Date().toISOString()
                }
            });

            console.log('\n--- Flight Record Confirmation ---');
            console.log(record);
        } catch (e) {
            console.error('Recording error:', e.message);
        }
    }
    demo();
}

module.exports = { CortexFlightRecorder };
