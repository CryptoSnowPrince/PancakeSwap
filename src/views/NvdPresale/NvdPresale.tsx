import React, { ChangeEvent, useEffect, useState } from "react";
import { Heading, Button, Input } from '@pancakeswap/uikit'
// import { useWeb3React } from '@web3-react/core'
// import ConnectWalletButton from 'components/ConnectWalletButton'
// import useTheme from 'hooks/useTheme'

function isWalletConnected() {
  return true;
}

function getTotalRaisedAmount() {
  return 20;
}

const NvdPresale = () => {

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [bnbAmount, setBNBAmount] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [raisedBNB, setRaisedBNB] = useState(2);
  const [url, setURL] = useState("");
  const [BNBStatus, setBNBStatus] = useState("");

  const buyTokenAmountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(parseInt(evt.target.value)) === true)
    {
      setTokenAmount(0)
    }
    else
    {
      setTokenAmount(parseInt(evt.target.value))
    }
  }

  useEffect(() => { 
    // useEffect(async () => { //TODO: implement
    // const { address, status } = await getCurrentWalletConnected();
    const address = "0x965";
    setWallet(address);
    setStatus("status");

    addWalletListener();
  }, []);

  useEffect(() => {
    setBNBAmount(tokenAmount / 100000);
    if ((tokenAmount / 100000) < 0.1) setBNBStatus("BNB Amount should be over 0.1");
    else setBNBStatus("");
  }, [tokenAmount])

  useEffect(() => {
    // useEffect(async () => {
    // let raisedAmount = await getTotalRaisedAmount();
    // let raisedAmount = getTotalRaisedAmount();
    setRaisedBNB(getTotalRaisedAmount());
    console.log("raisedAmount =", getTotalRaisedAmount());
  }, [status])
  
  const connectWalletPressed = async () => { 
    if (!isWalletConnected()) {
      // const { address, status } = await connectWalletUsingWeb3();
      console.log("============="); // fix+
      // setWallet(address);
      setWallet("0x965837");
      // console.log("=============1:address=" + address); // fix+
      setStatus(status);
      // console.log("=============2:status=" + status); // fix+
    } else {
      // await disconnectWallet();
      setWallet("");
    }
  };

  const onBuyPressed = async () => { 
    if (!isWalletConnected()) {
      // const status = "Connect your Wallet.";
      setStatus("Connect your Wallet.");
      return;
    }
    // const { status } = await buyToken(bnbAmount);
    setStatus("status1");
  };

  const addWalletListener = () => {
    if (window.ethereum) {
      // window.ethereum.on("accountsChanged", (accounts) => {
      //   if (accounts.length > 0) {
      //     setWallet(accounts[0]);
      //     setStatus("???? Put BNB Amount in the text-field above.");
      //   } else {
      //     setWallet("");
      //     setStatus("?? Connect to Metamask using the top right button.");
      //   }
      // })
    } else {
      // setStatus( 
      //   <p>
      //     {" "}
      //     ??{" "}
      //     <a target="_blank" href="https://metamask.io/download.html" rel="noreferrer">
      //       You must install Metamask, a virtual Ethereum wallet, in your
      //       browser.
      //     </a>
      //   </p>
      // );  
    }
  }

  return (
    <div>
        {/* <button id="walletButton" onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button> */}
        <Heading scale="xl" color="secondary" mb="24px" textAlign="center">
        Total Raised: {raisedBNB} BNB
          <Heading scale="xl" color="secondary" mb="24px">
          Total Token Sold: {raisedBNB*100000} NVD
          </Heading>

          <Heading scale="xl" color="secondary" mb="24px">
          Token Price: {1/100000}  BNB
          </Heading>

          <Heading scale="xl" color="secondary" mb="24px">
          NVD amount
          </Heading>
          <Input
            id="buyTokenAmount"
            placeholder="0"
            value={tokenAmount}
            onChange={buyTokenAmountChange}
            style={{ position: 'relative', marginLeft: (window.innerWidth - 120)/2 , zIndex: 16, paddingRight: '10px', maxWidth: '120px', textAlign: 'right'}}
          />

          <Heading scale="xl" color="secondary" mb="24px">
          BNB Amount :
            { bnbAmount } BNB
          </Heading>
          <Heading color='red' mb="20px">
          {BNBStatus}
          </Heading>

          <Button id="buyButton" onClick={onBuyPressed} >
            BUY NVD Token
          </Button>
          <Heading id = "status" color='red' mb="20px">
            {status}
          </Heading>
        </Heading>
      </div>
  );
};

export default NvdPresale;
