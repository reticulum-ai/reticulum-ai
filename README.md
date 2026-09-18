# Reticulum AI ($RAIX)
### The Settlement & State Layer for Autonomous AI Agents

[![Discord Community](https://img.shields.io/badge/Discord-Join%20Community-5865F2?logo=discord&logoColor=white)](https://discord.gg/WK7tYSse2)
[![X (Twitter)](https://img.shields.io/badge/X-@Reticulum__L1-000000?logo=x&logoColor=white)](https://x.com/Reticulum_L1)
[![Telegram](https://img.shields.io/badge/Telegram-Join%20Chat-24A1DE?logo=telegram&logoColor=white)](https://t.me/reticulum_ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Network](https://img.shields.io/badge/Network-Incentivized%20Testnet%202.0%20(Live)-6366f1.svg)](https://reticulum-ai.xyz)
[![Consensus](https://img.shields.io/badge/Consensus-RandomX%20CPU%20PoW-10b981.svg)](https://reticulum-ai.xyz)
[![Tokenomics](https://img.shields.io/badge/Fair%20Launch-0%25%20VC%20Premine-f59e0b.svg)](https://reticulum-ai.xyz)
[![Deflation](https://img.shields.io/badge/Gas%20Burn-30%25%20Permanent-ef4444.svg)](https://reticulum-ai.xyz)

---

## 💬 Official Community
* **Official Website**: [https://reticulum-ai.xyz](https://reticulum-ai.xyz)
* **X (Twitter)**: [@Reticulum_L1 (https://x.com/Reticulum_L1)](https://x.com/Reticulum_L1)
* **Discord Community**: [https://discord.gg/WK7tYSse2](https://discord.gg/WK7tYSse2)
* **Telegram Official**: [https://t.me/reticulum_ai](https://t.me/reticulum_ai)
* **Live Incentivized Leaderboard**: [https://reticulum-ai.xyz/#leaderboard](https://reticulum-ai.xyz/#leaderboard)

---

## 🌟 Overview

**Reticulum AI ($RAIX)** is a purpose-built Layer-1 blockchain engineered to cryptographically anchor and verify autonomous AI states. 

Rejecting the flawed paradigm of on-chain vector bloat, Reticulum AI enforces a strict **Separation of Concerns**:
* **Edge RAG (Off-Chain):** Autonomous AI agents run their high-dimensional vector search (HNSW / Cosine) and embeddings locally in-RAM with sub-millisecond retrieval.
* **L1 State Settlement (On-Chain):** The Reticulum blockchain handles machine-to-machine trust, `secp256k1` identities, 32-byte Merkle state root notarization, and friction-free $RAIX$ micro-payments.

Consensus is secured via **Nakamoto CPU Proof-of-Work powered by RandomX**, ensuring total ASIC-resistance, egalitarian participation for consumer CPUs, and true decentralization.

---

## 🏗️ Architectural Foundations

```
┌──────────────────────────────────────────────────────────────┐
│                    AUTONOMOUS AI AGENT (EDGE)                │
│  - In-RAM Local Vector Search (HNSW / Cosine Similarity)     │
│  - Dense Vector Embeddings (768-dim float32)                 │
│  - Client-Side Encryption (AES-256-GCM Privacy Enclave)      │
└──────────────────────────────┬───────────────────────────────┘
                               │ Merkle Leaf Commitment
                               ▼
┌──────────────────────────────────────────────────────────────┐
│             RETICULUM AI LAYER-1 (STATE NOTARY)           │
│  - Nakamoto Consensus (RandomX CPU Proof-of-Work)            │
│  - secp256k1 Cryptographic Signer Verification               │
│  - 32-Byte State Merkle Roots Inscribed into Block Headers    │
│  - Native $RAIX Peer-to-Peer Economic Settlement              │
│  - 30% Gas Combustion (Deflationary Flywheel)                │
└──────────────────────────────────────────────────────────────┘
```

### 🔒 Client-Side Privacy via AES-256-GCM
No sensitive vectors or raw reasoning states are ever exposed to the public blockchain. Agents encrypt their payloads locally before generating blinded cryptographic hash commitments:

$$\text{Ciphertext} = \text{AES-256-GCM}(K_{\text{agent}}, \text{Payload})$$
$$\text{LeafHash} = \text{SHA-256d}(\text{AgentID} \parallel \text{Topic} \parallel \text{SHA-256}(\text{Vector}) \parallel \text{Ciphertext})$$

Light clients verify any historical state transition via **60-byte Merkle proofs** with $O(\log N)$ computational complexity.

---

## 💎 Tokenomics & Monetary Policy

| Parameter | Specification |
| :--- | :--- |
| **Token Ticker** | **$RAIX** |
| **Total Hard Cap** | **21,000,000 RAIX** (Strict Mathematical Scarcity) |
| **Team / VC Pre-mine** | **0% (100% Community Fair Launch)** |
| **Initial Block Subsidy** | **50.00 RAIX per block** (Halving every 210,000 blocks / ~3.65 months) |
| **Deflationary Fee Burn** | **30% of every transaction fee permanently burned** |
| **Miner Fee Share** | **70% of Gas Fees + 50 RAIX Block Subsidy** |
| **Incentivized Testnet Allocation** | **1.0% (210,000 RAIX)** at Mainnet Genesis Block #0 |

### 🎁 Incentivized Testnet Bootstrap (70/30 Split)
* **70% (147,000 RAIX) — Active Hardware Miners:** Distributed pro-rata based on validated RandomX blocks and accepted pool shares.
* **30% (63,000 RAIX) — Community Testers:** Distributed equally across active addresses participating in DEX swaps, Web3 Wallet signatures & state commits.
* **Anti-Whale Hard Cap:** Maximum 3.0% (6,300 RAIX) per individual address (excess is redistributed).
* **3-Month Linear Vesting:** 20% liquid at Genesis Block #0, 80% streamed block-by-block over 90 days (~518,400 blocks).

---

## 🗺️ 4-Phase Roadmap

1. **Phase 1 (Active): Incentivized Testnet 1.0** — Live RandomX CPU pool mining, P2P DEX liquidity pool testing, Web3 Chrome Extension transaction signing, and Merkle root anchoring.
2. **Phase 2: Mainnet Preparation (Q4 2026)** — Official cryptographic snapshot of Testnet miner and tester addresses, Genesis block code audit, and multi-node stress-testing.
3. **Phase 3: Mainnet Genesis Launch (Q1 2027)** — 100% Fair Launch Block #0 with 0% team pre-mine, 1% Testnet distribution with 3-month vesting, and continuous 30% gas fee burning.
4. **Phase 4: Developer Ecosystem & Tooling (Q2 2027)** — Release of `cortex-protocol-python` SDK for local Edge RAG pipelines, developer grant programs, and native plugins for LangChain, AutoGPT, and CrewAI.

---

## 🚀 Quickstart: Running a Node & Mining

### 1. Prerequisites
- Node.js v20+ LTS
- Git

### 2. Clone and Install
```bash
git clone https://github.com/reticulum-ai/reticulum-ai.git
cd cortex-protocol
npm install
npm run build
```

### 3. Start a Local Node & Explorer
```bash
npm run start
# Open http://localhost:3000 to access the Web DApp, Explorer & Telemetry
```

### 4. Start RandomX CPU Mining
```bash
# Connect directly to the collaborative P2P pool or solo mine
npm run miner
```

---

## 📦 1-Click Standalone Windows Miner (No Setup Required)

Miners on Windows can download the pre-packaged standalone zip directly:
- **Download**: [https://reticulum-ai.xyz/downloads/reticulum-miner-windows.zip](https://reticulum-ai.xyz/downloads/reticulum-miner-windows.zip)
- Extract the archive and double-click **`Start-Mining-1Click.bat`** (or `Start-Mining.bat`).

---


---

## 🤖 AI Agent Framework Integrations

Reticulum AI ($RAIX) serves as the sovereign, decentralized memory and state settlement layer for autonomous AI agents across major frameworks:

### 1. 🟣 ElizaOS Plugin (`@cortex-protocol/plugin-eliza`)
Complete official plugin located in [`packages/plugin-cortex/`](packages/plugin-cortex/):
- **Cognitive Memory Provider**: Seals episodic and semantic memories into PoW blocks with 3ms Edge RAG recall.
- **Sovereign Wallet Provider**: Injects real-time $RAIX balance and wallet state into agent prompts.
- **On-Chain Actions**: `INSCRIBE_MEMORY`, `TRANSFER_CTX`, `CLAIM_FAUCET`.
- **Evaluator**: `autoAnchor` automatically detects high-value decisions and persists them on-chain.

```bash
# Run the live interactive ElizaOS agent demo
npx ts-node examples/eliza_cortex_agent.ts
```

### 2. 🦜🔗 LangChain & LangGraph Memory Provider (`cortex_protocol.langchain`)
Full integration in [`sdk/python/cortex_protocol/langchain.py`](sdk/python/cortex_protocol/langchain.py):
- **`ReticulumChatMessageHistory`**: Extends LangChain `BaseChatMessageHistory` (zero external dependencies required).
- **`ReticulumCheckpointer`**: Decentralized state snapshot saver for LangGraph agent decision trees.
- **30% Gas Fee Burn**: Every message turn burned permanently on-chain.
- **Cold-Reboot Hydration**: Automatically rehydrates entire conversation history from Reticulum L1 state upon agent container restart.

```python
from cortex_protocol import ReticulumClient, AgentWallet
from cortex_protocol.langchain import ReticulumChatMessageHistory

# 1. Connect agent with sovereign key
client = ReticulumClient(wallet=AgentWallet.generate())

# 2. Attach Reticulum persistent memory to any LangChain session
history = ReticulumChatMessageHistory(session_id="session_01", client=client)

# 3. Add messages - permanently anchored on L1 with 30% gas burn
history.add_user_message("Analyze liquidity on Reticulum DEX.")
history.add_ai_message("AMM pool TVL is $1.59M with 18.4% APY.")
```

```bash
# Run the live interactive LangChain & LangGraph demo
python3 examples/langchain_cortex_demo.py
```

### 3. 👥 CrewAI Multi-Agent Shared Memory (`cortex_protocol.crewai`)
Full multi-agent persistence in [`sdk/python/cortex_protocol/crewai.py`](sdk/python/cortex_protocol/crewai.py):
- **`ReticulumStorage`**: Implements the official CrewAI Storage interface with decentralized L1 persistence.
- **`ReticulumShortTermMemory` & `ReticulumLongTermMemory`**: Shared inter-agent context and long-term knowledge base.
- **`ReticulumEntityMemory`**: Decentralized entity registry (contracts, wallets, users, assets) shared across all agents in the crew.
- **Instant Crew Recovery**: Zero knowledge loss across agent crashes, container restarts, or server migrations.

```python
from cortex_protocol import ReticulumClient, AgentWallet
from cortex_protocol.crewai import ReticulumCrewMemory

# 1. Connect crew with sovereign agent wallet
client = ReticulumClient(wallet=AgentWallet.generate())

# 2. Attach shared Reticulum memory to your Crew
crew_memory = ReticulumCrewMemory(crew_name="defi-research-crew", client=client)

# 3. Agents share context and commit state on L1
crew_memory.record_agent_output(
    agent_name="Researcher",
    task_description="Analyze liquidity",
    output="Pool TVL is $1.59M with 18.4% APY."
)
```

```bash
# Run the live interactive CrewAI multi-agent demo
python3 examples/crewai_cortex_demo.py
```

### 4. ⚡ Phidata & Agno Agent Storage (`cortex_protocol.phidata`)
Decentralized session and memory storage in [`sdk/python/cortex_protocol/phidata.py`](sdk/python/cortex_protocol/phidata.py):
- **`ReticulumAgentStorage` / `ReticulumAgnoStorage`**: Drop-in replacement for PostgreSQL/SQLite backend in Phidata & Agno agents.
- **On-Chain Session Inscription**: Seals complete chat runs, tool execution trails, and user context directly onto Reticulum L1.
- **Cold Reboot Hydration**: Restores all past agent sessions and conversations across container migrations.
- **Gas Combustion**: 30% of every state flush burned permanently.

```python
from cortex_protocol import ReticulumClient, AgentWallet
from cortex_protocol.phidata import ReticulumAgentStorage, ReticulumAgentSession

# 1. Connect agent wallet to Reticulum L1
client = ReticulumClient(wallet=AgentWallet.generate())

# 2. Attach Reticulum storage backend (replaces PostgreSQL)
storage = ReticulumAgentStorage(table_name="financial_agents", client=client)

# 3. Read or upsert sessions with instant blockchain recall
session = storage.read(session_id="user_session_01")
```

```bash
# Run the live interactive Phidata & Agno demo
python3 examples/phidata_cortex_demo.py
```



## 📜 License

Open-source under the [MIT License](LICENSE). © 2026 Reticulum Research Foundation.

## 🐍 Python SDK for AI Agent Developers

Connect LangChain, CrewAI, AutoGPT, or ElizaOS agents to Reticulum AI in 3 lines of code:

```python
from cortex_protocol import ReticulumClient, AgentWallet

# Initialize wallet with sovereign secp256k1 key
wallet = AgentWallet.from_private_key("4a7f92b938471029384710293847102938471029384710293847102938471029")
client = ReticulumClient(node_url="https://reticulum-ai.xyz", wallet=wallet)

# 1. Inscribe immutable episodic memory (30% fee burned)
tx_id = client.inscribe_memory(
    agent_id="Quant-Alpha-01",
    topic="DeFi Arbitrage",
    content="Detected 3.84% spatial discrepancy across Uniswap v3 and Curve pool 0x88e.",
    memory_type="EPISODIC"
)
print(f"Memory sealed in mempool: {tx_id}")

# 2. Semantic Search across the global vector ledger
results = client.search_memories(query="arbitrage opportunities on curve", top_k=5)
for r in results:
    print(f"Match: {r.similarity_score}% | Fact: {r.content}")
```

---

## 🌐 Official Network Links

- **Official Web Application & Explorer**: [https://reticulum-ai.xyz](https://reticulum-ai.xyz)
- **Official Whitepaper**: [https://reticulum-ai.xyz/whitepaper.html](https://reticulum-ai.xyz/whitepaper.html)
- **Public REST API**: `https://reticulum-ai.xyz/api/stats`
- **P2P Gossip Peer**: `ws://141.145.223.211:6001`
- **Public Testnet Faucet**: [https://reticulum-ai.xyz](https://reticulum-ai.xyz) (Web Wallet Tab)

---

## 📜 License
Reticulum AI is open-source software licensed under the [MIT License](LICENSE).
