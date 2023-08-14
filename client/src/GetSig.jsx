import server from "./server";
import { toHex } from "ethereum-cryptography/utils.js";

function GetSig({
  address,
  setPrivateKey,
  balance,
  privateKey,
  setBalance,
  getSignature,
  signature,
  recoveryBit,
  setAddressRecipient,
  addressRecipient,
  sendAmount,
  setSendAmount,
  rSig
}) {
  async function onChange(evt) {
    const address = evt.target.value;
    setPrivateKey(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }

    getSignature();
    console.log(signature);
  }

  function onSubmit() {
    getSignature(addressRecipient, privateKey, sendAmount)
  }

  return (
    <div className="container wallet">
      <h1>Get Signature</h1>

      <label>
        Private Key
        <input
          placeholder="Type an address, for example: 0x1"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        ></input>
      </label>
      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x1"
          value={addressRecipient}
          onChange={(e)=> setAddressRecipient(e.target.value)}
        ></input>
      </label>
      <label>
        Amount
        <input
          placeholder="quantity"
          value={sendAmount}
          onChange={(e)=> setSendAmount(e.target.value)}
        ></input>
      </label>

      <button onClick={onSubmit} className="button">Get Signature</button>

      {signature && <p>s signature: {signature}</p>}
      {signature && <p>r signature: {rSig}</p>}
      {recoveryBit && <p>recovery bit: {recoveryBit}</p>}
    </div>
  );
}

export default GetSig;
