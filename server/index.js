const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const {toHex} = require("ethereum-cryptography/utils.js")
const {sha256} = require("ethereum-cryptography/sha256.js");
const {secp256k1} = require("ethereum-cryptography/secp256k1.js");

app.use(cors());
app.use(express.json());

const balances = {
  //private key: cd9801ee88e1dabb21e651d7e34c96451ab7d284c985a11249bf9df4a4ad3e04
  "b9a01278b167d93216ac2018954958477a85d90770a506db1e9eac8a9879bf15": 100,
  //private key: 476af2394aafacbfa9d992bb7fae80d56b487bf3f36577b3e799c7e671bafdbd
  "187f8f72547a49fbac34f095778e523aee21ebadd72c4e8686abf38f3816b7ee": 50,
  "0x3": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

 

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
