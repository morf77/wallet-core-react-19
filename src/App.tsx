import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import * as BrowserFS from 'browserfs'
import { promisify } from "util";

// import fsPromises from './fs-config.mjs'
// import path from "path";

// import * as test from 'fs/promises'





const configureBrowserFS = () => {
  return new Promise((resolve, reject) => {
    BrowserFS.configure({ fs: "InMemory" ,options:{}}, (err) => {
      if (err) {
        reject(err);
      } else {
        const fs = BrowserFS.BFSRequire('fs');
        console.log("broserfs--------",fs)
        const fsPromises = {
          writeFile: promisify(fs.writeFile),
          readFile: promisify(fs.readFile),
          unlink: promisify(fs.unlink),
          readdir: promisify(fs.readdir),
          mkdir: promisify(fs.mkdir),
          rmdir: promisify(fs.rmdir),
          
          stat: promisify(fs.stat),
        };

        // window.fs = fs;
        // window.fs.promises = fsPromises;

        console.log('BrowserFS initialized successfully!');
        resolve(fs);
      }
    });
  });
}

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [rawTx, setRawTx] = useState("");

  const handleCreateWallet = () => {
    const { HDWallet } = window.WalletCore;
    const wallet = HDWallet.create(128, "");

    setMnemonic(wallet.mnemonic());
    wallet.delete();
  };

  const testSignEthereumTx = () => {
    const { TW, WalletCore } = window;
    const { HexCoding, AnySigner, CoinType } = WalletCore;

    const input = TW.Ethereum.Proto.SigningInput.create({
      toAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
      chainId: Buffer.from("01", "hex"),
      nonce: Buffer.from("00", "hex"),
      txMode: TW.Ethereum.Proto.TransactionMode.Enveloped,
      maxInclusionFeePerGas: Buffer.from("0077359400", "hex"),
      maxFeePerGas: Buffer.from("00b2d05e00", "hex"),
      gasLimit: Buffer.from("0130B9", "hex"),
      transaction: TW.Ethereum.Proto.Transaction.create({
        erc20Transfer: TW.Ethereum.Proto.Transaction.ERC20Transfer.create({
          to: "0x5322b34c88ed0691971bf52a7047448f0f4efc84",
          amount: Buffer.from("1bc16d674ec80000", "hex"),
        }),
      }),
      privateKey: HexCoding.decode(
        "0x608dcb1742bb3fb7aec002074e3420e4fab7d00cced79ccdac53ed5b27138151"
      ),
    });

    const encoded = TW.Ethereum.Proto.SigningInput.encode(input).finish();
    const outputData = AnySigner.sign(encoded, CoinType.ethereum);
    const output = TW.Ethereum.Proto.SigningOutput.decode(outputData);

    setRawTx(HexCoding.encode(output.encoded));
  };


  // const [isFsReady, setIsFsReady] = useState(false);

  window.WalletCore = WalletCore;
  window.TW = TW;



  useEffect(() => {
    try{
      configureBrowserFS()
      .then(async() => console.log("BrowserFS initialized",await import('fs'),await import('./fs-config.js')))
      .catch((e)=>console.log(e))
      // .finally(async()=>console.log("BrowserFS initialized",await import('fs/promises'),await import('./fs-config.js')));
    } catch (e) {
      console.log(e)
    }
  }, []);

  // console.log(fsPromises)

  
  // useEffect(() => {
      // .then(() => setIsFsReady(true))
      // .catch(console.error);

  // }, []);


  // console.log('Webpack version:', require('webpack').version);


  return (
    <div>
      <button onClick={handleCreateWallet}>Create Wallet</button>
      <div>Mnemonic: {mnemonic}</div>
      <button onClick={testSignEthereumTx}>Signing Ethereum tx</button>
      <div>Raw tx: {rawTx}</div>
    </div>
  );
}

export default App;
