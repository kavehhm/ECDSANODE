import server from "./server";

function Wallet({
  address,
  setPrivateKey,
  balance,
  setBalance,
  getSignature,
  signature,
  recoveryBit,
  senderPublicKey,
  setSenderPublicKey
}) {
  async function onChange(evt) {
    const address = evt.target.value;
    setSenderPublicKey(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }

    console.log(signature);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Public Key
        <input
          placeholder="Type an address, for example: 0x1"
          value={senderPublicKey}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
