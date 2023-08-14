import { useEffect, useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Transfer({
  setBalance,

  address,
  setPrivateKey,
  balance,
  privateKey,
  wholeSig,
  getSignature,
  signature,
  recoveryBit,
  setAddressRecipient,
  addressRecipient,
  sendAmount,
  setSendAmount,
  hash,
  setSenderPublicKey,
  senderPublicKey
}) {
  const [enteredRSig, setEnteredRSig] = useState("");
  const [enteredSSig, setEnteredSSig] = useState("");
  const [enteredWholeSig, setEnteredWholeSig] = useState("");


  useEffect(() => {
    setEnteredWholeSig({r: BigInt(enteredRSig), s: BigInt(enteredSSig)})
  }, [enteredRSig, enteredSSig])
  


  const setValue = (setter) => (evt) => setter(evt.target.value);


  async function transfer(evt) {
    evt.preventDefault();
    console.log(secp256k1.verify(enteredWholeSig, toHex(hash), senderPublicKey ))
    console.log(wholeSig.r === enteredWholeSig.r)

    if (wholeSig.r === enteredWholeSig.r)
 {
      
      try {
        const {
          data: { balance },
        } = await server.post(`send`, {
          sender: senderPublicKey,
          amount: parseInt(sendAmount),
          recipient: addressRecipient,
        });
        setBalance(balance);
        console.log(senderPublicKey)
        console.log('SUCCESSFUL TRANSFER!')
      } catch (ex) {
        alert(ex.response.data.message);
      }
    }

  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Sender Public Key
        <input
          placeholder="1, 2, 3..."
          value={senderPublicKey}
          onChange={(e)=>setSenderPublicKey(e.target.value)}
        ></input>
      </label>
      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={addressRecipient}
          onChange={setValue(setAddressRecipient)}
        ></input>
      </label>
      
      <label>
        S Sig
        <input
          placeholder="Type an address, for example: 0x2"
          onChange={(e)=>setEnteredSSig(e.target.value)}
        ></input>
      </label>
      <label>
        R Sig
        <input
          placeholder="Type an address, for example: 0x2"
          onChange={(e)=>setEnteredRSig(e.target.value)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
