import 'dotenv/config';
import { CortexCrypto } from './src/core/crypto';
import { Transaction } from './src/core/transaction';
import http from 'http';

const privKey = process.env.FAUCET_PRIVATE_KEY || '4a7f92b938471029384710293847102938471029384710293847102938471029';
const keypair = CortexCrypto.fromPrivateKey(privKey);

const recipient = 'ctx1a0978f28693ee9e97b3db9c7e5406d91e019f4d36bb7e51a';
const amount = 250.0;
const fee = 0.05;

// Fetch current nonce
http.get('http://127.0.0.1:3000/api/balance/' + keypair.address, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const balanceData = JSON.parse(data);
        const nonce = balanceData.nonce || 0;
        console.log('Sender Address:', keypair.address);
        console.log('Current Balance:', balanceData.balance, 'RAI, Nonce:', nonce);

        const tx = new Transaction({
            type: 'TRANSFER',
            sender: keypair.address,
            senderPublicKey: keypair.publicKey,
            recipient: recipient,
            amount: amount,
            fee: fee,
            nonce: nonce,
            payload: { memo: 'Compensation 250 RAI for testnet mining support' }
        });

        const txHash = tx.calculateHash();
        tx.signature = CortexCrypto.sign(txHash, keypair.privateKey);

        const postData = JSON.stringify(tx);
        const req = http.request({
            hostname: '127.0.0.1',
            port: 3000,
            path: '/api/transactions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, (postRes) => {
            let resBody = '';
            postRes.on('data', c => resBody += c);
            postRes.on('end', () => {
                console.log('Tx Broadcast Response:', resBody);
            });
        });
        req.write(postData);
        req.end();
    });
});
