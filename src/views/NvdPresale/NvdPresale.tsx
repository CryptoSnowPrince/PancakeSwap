import React, { ChangeEvent, useEffect, useState } from "react";
import { Heading, Button, Input } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useTheme from 'hooks/useTheme'

function isWalletConnected() {
  return false;
}

function getTotalRaisedAmount() {
  return 2000;
}

const NvdPresale = () => {
  
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [bnbAmount, setBNBAmount] = useState(0.0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [raisedBNB, setRaisedBNB] = useState(0);
  const [url, setURL] = useState("");
  const [BNBStatus, setBNBStatus] = useState("");

  enum ResultStatus {
    NOT_VALID,
    FOUND,
    NOT_FOUND,
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = evt.target
    setState((prevState) => ({
      ...prevState,
      value: newValue,
    }))
  }

  const initialState = {
    isFetching: false,
    resultFound: ResultStatus.NOT_VALID,
    value: '',
  }
  const [state, setState] = useState(initialState);

  useEffect(() => { 
    // useEffect(async () => { //TODO: implement
    // const { address, status } = await getCurrentWalletConnected();
    const address = "0x965";
    setWallet(address);
    setStatus("status");

    addWalletListener();
  }, []);

  useEffect(() => {
    setBNBAmount(tokenAmount / 5000);
    if ((tokenAmount / 5000) < 0.1) setBNBStatus("BNB Amount should be over 0.1");
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
    // const { status } = await buyToken(bnbAmount);
    setStatus("status1");
  };

  const addWalletListener = () => {
    // if (window.ethereum) {
    //   window.ethereum.on("accountsChanged", (accounts) => {
    //     if (accounts.length > 0) {
    //       setWallet(accounts[0]);
    //       setStatus("???? Put BNB Amount in the text-field above.");
    //     } else {
    //       setWallet("");
    //       setStatus("?? Connect to Metamask using the top right button.");
    //     }
    //   })
    // } else {
    //   setStatus(
    //     <p>
    //       {" "}
    //       ??{" "}
    //       <a target="_blank" href={`https://metamask.io/download.html`}>
    //         You must install Metamask, a virtual Ethereum wallet, in your
    //         browser.
    //       </a>
    //     </p>
    //   );  
    // }
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
          Total Token Sold: {raisedBNB*5000} NVD
          </Heading>

          <Heading scale="xl" color="secondary" mb="24px">
          Token Price: {1/5000}  BNB
          </Heading>

          <Heading scale="xl" color="secondary" mb="24px">
          NVD amount
          </Heading>
          <Input
            placeholder="0"
            value={state.value}
            onChange={handleChange}
            style={{ position: 'relative', marginLeft: (window.innerWidth - 120)/2 , zIndex: 16, paddingRight: '10px', maxWidth: '120px', textAlign: 'right'}}
          />
         
          {/* </div>
          <input
          type="text"
          placeholder="0"
          value={tokenAmount}
          // onChange={(event) => setTokenAmount(event.target.value)}
          /> */}

          
          <Heading scale="xl" color="secondary" mb="24px">
          BNB Amount :
            { bnbAmount } BNB
          </Heading>
          <Heading color='red' mb="20px">
          {BNBStatus}
          </Heading>

          <Button id="mintButton" onClick={onBuyPressed} >
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
