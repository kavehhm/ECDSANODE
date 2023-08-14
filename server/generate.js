const {toHex} = require("ethereum-cryptography/utils.js")
const {keccak, keccak256} = require("ethereum-cryptography/keccak");
const {secp256k1} = require("ethereum-cryptography/secp256k1.js");



const privateKey = secp256k1.utils.randomPrivateKey();
console.log("private key: " + toHex(privateKey));
const publicKey = secp256k1.getPublicKey(privateKey);
console.log("public key: " + publicKey);

let address = keccak256(publicKey.slice(1).slice(-20));
console.log("address: " + toHex(address));
