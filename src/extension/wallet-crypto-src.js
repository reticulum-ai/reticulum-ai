// RETICULUM AI - BROWSER WALLET CRYPTOGRAPHIC ENGINE
// Self-contained, zero external network dependency, Manifest V3 CSP compliant.

import * as bip39 from 'bip39';
import { ec as EC } from 'elliptic';
import hash from 'hash.js';

const ec = new EC('secp256k1');

export const ReticulumCrypto = {
    /**
     * Generate a new 12-word BIP-39 mnemonic seed phrase
     */
    generateMnemonic(strength = 128) {
        return bip39.generateMnemonic(strength);
    },

    /**
     * Validate a 12 or 24 word mnemonic phrase
     */
    validateMnemonic(mnemonic) {
        return bip39.validateMnemonic(mnemonic.trim());
    },

    /**
     * Derive 32-byte private key hex from a BIP-39 mnemonic
     */
    mnemonicToPrivateKey(mnemonic, passphrase = '') {
        const seed = bip39.mnemonicToSeedSync(mnemonic.trim(), passphrase);
        // Take the first 32 bytes of the 512-bit seed as master private key
        return seed.subarray(0, 32).toString('hex');
    },

    /**
     * Derive public key and canonical ctx1... address from private key hex
     */
    fromPrivateKey(privateKeyHex) {
        const cleanPriv = privateKeyHex.trim().toLowerCase().replace(/^0x/, '');
        const key = ec.keyFromPrivate(cleanPriv, 'hex');
        const privateKey = key.getPrivate('hex').padStart(64, '0');
        const publicKey = key.getPublic(true, 'hex'); // Compressed format (33 bytes)

        // Derive ctx1... address
        const pubKeyHash = hash.sha256().update(Buffer.from(publicKey, 'hex')).digest();
        const ripemd = hash.ripemd160().update(pubKeyHash).digest('hex');
        const check = hash.sha256().update(hash.sha256().update(ripemd).digest()).digest('hex').substring(0, 8);
        const address = `ctx1${ripemd}${check}`;

        return { privateKey, publicKey, address };
    },

    /**
     * Generate a brand new KeyPair with mnemonic
     */
    createWallet() {
        const mnemonic = this.generateMnemonic();
        const privateKey = this.mnemonicToPrivateKey(mnemonic);
        const keyPair = this.fromPrivateKey(privateKey);
        return {
            mnemonic,
            ...keyPair
        };
    },

    /**
     * Validate canonical address format
     */
    isValidAddress(address) {
        if (!address || typeof address !== 'string') return false;
        const trimmed = address.trim();
        if (!trimmed.startsWith('ctx1') || trimmed.length !== 52) return false;
        const payload = trimmed.slice(4);
        if (!/^[0-9a-fA-F]{48}$/.test(payload)) return false;

        const ripemd = payload.slice(0, 40);
        const checksum = payload.slice(40);
        const expected = hash.sha256().update(hash.sha256().update(ripemd).digest()).digest('hex').substring(0, 8);
        return checksum.toLowerCase() === expected.toLowerCase();
    },

    /**
     * Compute transaction hash (SHA256)
     */
    calculateTxHash(data) {
        const raw = `${data.type}:${data.sender}:${data.recipient}:${data.amount}:${data.fee || 0}:${data.burnAmount || 0}:${data.nonce || 0}:${data.timestamp}:${data.memHash || ''}`;
        return hash.sha256().update(raw).digest('hex');
    },

    /**
     * Sign hash with private key (ECDSA DER format)
     */
    signHash(dataHashHex, privateKeyHex) {
        const key = ec.keyFromPrivate(privateKeyHex, 'hex');
        const sig = key.sign(dataHashHex, 'hex', { canonical: true });
        return sig.toDER('hex');
    },

    /**
     * Sign full transaction and return signed transaction object
     */
    signTransaction(txData, privateKeyHex) {
        const keyPair = this.fromPrivateKey(privateKeyHex);
        const txHash = this.calculateTxHash({
            type: txData.type || 'TRANSFER',
            sender: keyPair.address,
            recipient: txData.recipient,
            amount: txData.amount,
            fee: txData.fee || 0.01,
            burnAmount: txData.burnAmount || 0,
            nonce: txData.nonce || 0,
            timestamp: txData.timestamp || Date.now(),
            memHash: txData.memHash || ''
        });
        const signature = this.signHash(txHash, keyPair.privateKey);

        return {
            id: txHash,
            type: txData.type || 'TRANSFER',
            sender: keyPair.address,
            senderPublicKey: keyPair.publicKey,
            recipient: txData.recipient,
            amount: txData.amount,
            fee: txData.fee || 0.01,
            burnAmount: txData.burnAmount || 0,
            nonce: txData.nonce || 0,
            timestamp: txData.timestamp || Date.now(),
            signature
        };
    },

    /**
     * Encrypt vault using password with WebCrypto (PBKDF2 + AES-GCM-256)
     */
    async encryptVault(dataObj, password) {
        const enc = new TextEncoder();
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));

        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            enc.encode(password),
            { name: 'PBKDF2' },
            false,
            ['deriveKey']
        );

        const key = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt']
        );

        const plaintext = enc.encode(JSON.stringify(dataObj));
        const ciphertext = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            plaintext
        );

        return {
            ciphertext: Array.from(new Uint8Array(ciphertext)).map(b => b.toString(16).padStart(2, '0')).join(''),
            iv: Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join(''),
            salt: Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')
        };
    },

    /**
     * Decrypt vault using password with WebCrypto (PBKDF2 + AES-GCM-256)
     */
    async decryptVault(encryptedVault, password) {
        const enc = new TextEncoder();
        const fromHex = hex => new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

        const salt = fromHex(encryptedVault.salt);
        const iv = fromHex(encryptedVault.iv);
        const ciphertext = fromHex(encryptedVault.ciphertext);

        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            enc.encode(password),
            { name: 'PBKDF2' },
            false,
            ['deriveKey']
        );

        const key = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['decrypt']
        );

        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            ciphertext
        );

        return JSON.parse(new TextDecoder().decode(decrypted));
    }
};

if (typeof window !== 'undefined') {
    window.ReticulumCrypto = ReticulumCrypto;
    window.CortexCrypto = ReticulumCrypto;
}
