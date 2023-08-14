import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { useEffect } from "react";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
import GetSig from "./GetSig";

function App() {
  const [balance, setBalance] = useState(0);
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");
  const [addressRecipient, setAddressRecipient] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [wholeSig, setWholeSig] = useState("");
  const [hash, setHash] = useState("");
  const [senderPublicKey, setSenderPublicKey] = useState("");
  const [rSig, setRSig] = useState("");

  function hashMessage(message) {
    return keccak256(utf8ToBytes(message));
  }

  function document() {
    const hash = hashMessage(
      JSON.stringify({
        sender: privateKey,
        amount: parseInt(sendAmount),
        // id: Math.random(),
        recepient: addressRecipient
      })
    );

    setHash(hash)
    return hash
  }

  async function getSignature(receiver, pKey, quantity) {
    if (receiver && pKey && quantity) {
      const sig = secp256k1.sign(document(), pKey);
      setWholeSig(sig);
      setSignature(sig.s.toString());
      setRSig(sig.r.toString()) 
      setRecoveryBit(sig.recovery.toString());

      console.log(sig);
    }
  }

  return (
    <div className="app">
      <GetSig
        balance={balance}
        getSignature={getSignature}
        signature={signature}
        recoveryBit={recoveryBit}
        privateKey={privateKey}
        addressRecipient={addressRecipient}
        setAddressRecipient={setAddressRecipient}
        address={privateKey}
        rSig={rSig}
        setPrivateKey={setPrivateKey}
        sendAmount={sendAmount}
        setSendAmount={setSendAmount}
      />
      <Wallet
        balance={balance}
        getSignature={getSignature}
        signature={signature}
        recoveryBit={recoveryBit}
        setBalance={setBalance}
        address={privateKey}
        setPrivateKey={setPrivateKey}
        senderPublicKey={senderPublicKey}
        setSenderPublicKey={setSenderPublicKey}
      />
      <Transfer
        balance={balance}
        getSignature={getSignature}
        signature={signature}
        recoveryBit={recoveryBit}
        privateKey={privateKey}
        addressRecipient={addressRecipient}
        setAddressRecipient={setAddressRecipient}
        address={privateKey}
        setPrivateKey={setPrivateKey}
        sendAmount={sendAmount}
        setSendAmount={setSendAmount}
        setBalance={setBalance}
        wholeSig={wholeSig}
        hash={hash}
        senderPublicKey={senderPublicKey}
        setSenderPublicKey={setSenderPublicKey}
      />
    </div>
  );
}

export default App;
