// import React, { useEffect, useState } from "react";
import React from "react";
// import './Nvd.css';
// import './NvdPresale.css';

function isWalletConnected() {
  return false;
}

function getTotalRaisedAmount() {
  return 2000;
}

const NvdPresale = async () => {
  const raisedBNB = 0.1;
  const tokenAmount = 1000000;
  const bnbAmount = 10;

  return (
    <div className="Minter">
      <h1>Total Raised: {raisedBNB} BNB</h1>
      <h1>Total Token Sold: {raisedBNB*5000} NVD</h1>
      
      <h2>Token Price: {1/5000}  BNB</h2>
      <form>
        <h1>NVD amount</h1>
        <input
          type="text"
          placeholder="0"
          value={tokenAmount}
        />
      </form>
      <h1>
        BNB Amount :
        { bnbAmount } BNB
      </h1>
    </div>
  );

  // const [walletAddress, setWallet] = useState("");
  // const [status, setStatus] = useState("");
  // const [name, setName] = useState("");
  // const [bnbAmount, setBNBAmount] = useState(0.0);
  // const [tokenAmount, setTokenAmount] = useState(0);
  // const [description, setDescription] = useState("");
  // const [raisedBNB, setRaisedBNB] = useState(0);
  // const [url, setURL] = useState("");
  
  // const [BNBStatus, setBNBStatus] = useState("");
  
  // useEffect(() => { 
  //   // useEffect(async () => { //TODO: implement
  //   // const { address, status } = await getCurrentWalletConnected();
  //   const address = "0x965";
  //   setWallet(address);
  //   setStatus("status");

  //   addWalletListener();
  // }, []);

  // useEffect(() => {
  //   setBNBAmount(tokenAmount / 5000);
  //   if ((tokenAmount / 5000) < 0.1) setBNBStatus("BNB Amount should be over 0.1");
  //   else setBNBStatus("");
  // }, [tokenAmount])

  // useEffect(() => {
  //   // useEffect(async () => {
  //   // let raisedAmount = await getTotalRaisedAmount();
  //   // let raisedAmount = getTotalRaisedAmount();
  //   setRaisedBNB(getTotalRaisedAmount());
  //   console.log("raisedAmount =", getTotalRaisedAmount());
  // }, [status])

  // const connectWalletPressed = async () => { 
  //   if (!isWalletConnected()) {
  //     // const { address, status } = await connectWalletUsingWeb3();
  //     console.log("============="); // fix+
  //     // setWallet(address);
  //     setWallet("0x965837");
  //     // console.log("=============1:address=" + address); // fix+
  //     setStatus(status);
  //     // console.log("=============2:status=" + status); // fix+
  //   } else {
  //     // await disconnectWallet();
  //     setWallet("");
  //   }
  // };

  // const onBuyPressed = async () => { 
  //   if (!isWalletConnected()) {
  //     // const status = "Connect your Wallet.";
  //     setStatus("Connect your Wallet.");
  //     return;
  //   }
  //   // const { status } = await buyToken(bnbAmount);
  //   // const { status } = await buyToken(bnbAmount);
  //   setStatus("status1");
  // };

  // const addWalletListener = () => {
  //   // if (window.ethereum) {
  //   //   window.ethereum.on("accountsChanged", (accounts) => {
  //   //     if (accounts.length > 0) {
  //   //       setWallet(accounts[0]);
  //   //       setStatus("👆🏽 Put BNB Amount in the text-field above.");
  //   //     } else {
  //   //       setWallet("");
  //   //       setStatus("🦊 Connect to Metamask using the top right button.");
  //   //     }
  //   //   })
  //   // } else {
  //   //   setStatus(
  //   //     <p>
  //   //       {" "}
  //   //       🦊{" "}
  //   //       <a target="_blank" href={`https://metamask.io/download.html`}>
  //   //         You must install Metamask, a virtual Ethereum wallet, in your
  //   //         browser.
  //   //       </a>
  //   //     </p>
  //   //   );  
  //   // }
  // }

  // return (
  //   <div className="Minter">
  //     {/* <button id="walletButton" onClick={connectWalletPressed}>
  //       {walletAddress.length > 0 ? (
  //         "Connected: " +
  //         String(walletAddress).substring(0, 6) +
  //         "..." +
  //         String(walletAddress).substring(38)
  //       ) : (
  //         <span>Connect Wallet</span>
  //       )}
  //     </button> */}
  //     <h1>Total Raised: {raisedBNB} BNB</h1>
  //     <h1>Total Token Sold: {raisedBNB*5000} NVD</h1>
  //     {/* <br></br> */}
      
  //     <h2>Token Price: {1/5000}  BNB</h2>
  //     <form>
  //       <h1>NVD amount</h1>
  //       <input
  //         type="text"
  //         placeholder="0"
  //         value={tokenAmount}
  //         onChange={(event) => setTokenAmount(1000)}
  //         // onChange={(event) => setTokenAmount(event.target.value)}
  //       />
  //     </form>
  //     <h1>
  //       BNB Amount :
  //       { bnbAmount } BNB
  //     </h1>
  //     <p style={{color: 'red'}}>
  //       {BNBStatus}
  //     </p>

  //     {/* <button id="mintButton" onClick={onBuyPressed}>
  //       BUY NVD Token
  //     </button> */}
  //     <p id="status">
  //       {status}
  //     </p>
  //   </div>
  // );
};

export default NvdPresale;
