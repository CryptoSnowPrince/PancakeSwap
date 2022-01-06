import React, { ChangeEvent, useEffect, useState } from "react";
import { Heading, Button, Input } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'



// import React from 'react';
// import { useWeb3React } from '@web3-react/core';
// import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
// import Web3Modal from "web3modal";
import axios from "axios";
import dotenv from 'dotenv';
import contractABI from './presale.json';

dotenv.config();
// require('dotenv').config();
axios.defaults.xsrfHeaderName = "X-CSRFToken";


// const Web3 = require('web3');
// const contractABI = require('./presale.json')
const contractAddress = "0x082dE4295c7d44495A9fa697b826fFa3214A52A4";
// const BN = require('bn.js');

let walletProvider = null;
let connectedUserAddress = null;
const transactionDataToDjango = {
  from_taken: '',
  to: '',
  token_quantity: 0,
  bnb_received: 0,
  transaction_id: '',
  ip_address: '127.0.0.1',
  transaction_status: ''
}

const isWalletConnected = () => {
  if (walletProvider !== null && walletProvider !== undefined ) return true;
  return false;
}

// const getCurrentWalletConnected = async () => {
//   if (isWalletConnected()) {
//     const web3 = new Web3(walletProvider);
//     const accounts = await web3.eth.getAccounts();
//     const address = accounts[0];
//     return {
//       address: `${address}`,
//       status_: `👆🏽 Put BNB Amount in the text-field above.`
//     }
//   }
//   return {
//     address: "",
//     status_: `🦊 Connect to Wallet using the top right button.`,
//   }
// }

const getTotalRaisedAmount = async () => {
    const web3 = new Web3('https://data-seed-prebsc-2-s3.binance.org:8545/');
    let bnbAmount = await web3.eth.getBalance(contractAddress);
    bnbAmount = web3.utils.fromWei(bnbAmount, 'ether');
    return bnbAmount;
}

function getIP(json) {
    return json.ip;
  }

export const buyToken = async (bnbAmount) => {
  if (bnbAmount < 0.01) return {
    success: false,
    status_: "BNB Amount should be over 0.01",
  };
  console.log(`${bnbAmount}`);
  if (!walletProvider) return {
    success: false,
    status_: "🦊 Connect to Wallet using the top right button",
  };
  const web3 = new Web3(walletProvider);
  // @ts-ignore
  window.contract = await new web3.eth.Contract(contractABI, contractAddress); // loadContract();
  transactionDataToDjango.bnb_received = bnbAmount;
  // bnbAmount = (new BN(parseInt(bnbAmount*1000)).mul(new BN(10).pow(new BN(15))));
  // const provider = await web3Modal.connect();

  // Here needs to Work, to do buy tokens
  const nonce = await web3.eth.getTransactionCount(contractAddress, 'latest');
  const transactionParameters = {
      from: connectedUserAddress,
      to: contractAddress,
      value: web3.utils.toWei(`${bnbAmount}''`, 'ether'),
      // @ts-ignore
      'data': window.contract.methods.buyTokens().encodeABI()
  };

  try {
    console.log("walletProvider =", walletProvider);
    // let signer = walletProvider.getSigner();
    // const createTransaction = await signer.signTransaction(transactionParameters);
    
      // const createTransaction = await web3.eth.accounts.signTransaction(transactionParameters, '7f574ebdb00fde4270f2798337bcc6c602dcf5683c5e8695b7fdd02bdb35c0f5' );

      const createReceipt = await web3.eth.sendTransaction(transactionParameters);
      const txHash = createReceipt.transactionHash;
      
      // Following few code by Django Developer to save transaction history in database. It sends data using transactionDataToDjango variable to django database
      transactionDataToDjango.from_taken = transactionParameters.from;
      transactionDataToDjango.to = transactionParameters.to;
      transactionDataToDjango.token_quantity = 5000 * transactionDataToDjango.bnb_received;
      transactionDataToDjango.transaction_id = txHash;
      transactionDataToDjango.transaction_status = 'success';
      // transactionDataToDjango['ip_address'] = document.getElementById('id_user_ip_address').value;
      axios
      .post("/api/save_transaction/", transactionDataToDjango)
      .then();
      // .then((res) => {} );
      // Added Upto this 


      return {
          success: true,
          status_: `✅ Check out your transaction on bscscan: https://testnet.bscscan.com/tx/${txHash}`
      }
  } catch (error) {
    console.log(error);
      // Following few code by Django Developer to save transaction history in database. It sends data using transactionDataToDjango variable to django database
      transactionDataToDjango.from_taken = transactionParameters.from;
      transactionDataToDjango.to = transactionParameters.to;
      transactionDataToDjango.token_quantity = 5000 * transactionDataToDjango.bnb_received;
      transactionDataToDjango.transaction_id = '';
      transactionDataToDjango.transaction_status = 'failed';
      // transactionDataToDjango['ip_address'] = document.getElementById('id_user_ip_address').value;
      axios
      .post("/api/save_transaction/", transactionDataToDjango)
      .then((res) => { console.log(`${res}`)} );
      // Added Upto this //


      return {
          success: false,
          status_: `😥 Something went wrong: ${error}`
      }
  }
} 

// import { isWalletConnected, getCurrentWalletConnected, buyToken, getTotalRaisedAmount } from './interact';
// import ConnectWalletButton from 'components/ConnectWalletButton'
// import useTheme from 'hooks/useTheme'

const NvdPresale = () => {
  const { library, account, chainId } = useActiveWeb3React();
  connectedUserAddress = account;
  walletProvider = library;
  console.log(`connectedUserAddress:${connectedUserAddress}`);
  console.log(`chainId:${chainId}`);
  console.log(`library:${library}`);
  // const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  // const [name, setName] = useState("");
  const [bnbAmount, setBNBAmount] = useState(0.0);
  const [tokenAmount, setTokenAmount] = useState(0);
  // const [description, setDescription] = useState("");
  const [raisedBNB, setRaisedBNB] = useState(0);
  // const [url, setURL] = useState("");
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

  // useEffect(() => { 
  //   async function fetchData() {
  //     const { address, status_ } = await getCurrentWalletConnected();
  //     setWallet(address);
  //     setStatus(status_);

  //     // addWalletListener();
  //   }
  //   fetchData();
  // }, [walletAddress, status]);

  useEffect(() => {
    setBNBAmount(tokenAmount / 100000);
    if ((tokenAmount / 100000) < 0.01) setBNBStatus("BNB Amount should be over 0.01");
    else setBNBStatus("");
  }, [tokenAmount])

  useEffect(() => {
    async function fetchData() {
      const raisedAmount = await getTotalRaisedAmount();
      setRaisedBNB(parseInt(raisedAmount));
      // console.log("raisedAmount =", raisedAmount);
    }
    fetchData();
  }, [status])
  
  // const connectWalletPressed = async () => { 
  //   if (!isWalletConnected()) {
  //     const { address, status_ } = await connectWalletUsingWeb3();
  //     setWallet(address);
  //     setStatus(status_);
  //   } else {
  //     await disconnectWallet();
  //     setWallet("");
  //   }
  // };

  const onBuyPressed = async () => { 
    if (!isWalletConnected()) {
      setStatus("Connect your Wallet.");
      return;
    }
    const { status_ } = await buyToken(bnbAmount);
    setStatus(status_);
  };

  // const addWalletListener = () => {
  //   if (window.ethereum) {
  //     // @ts-ignore
  //     window.ethereum.on("accountsChanged", (accounts) => {
  //       if (accounts.length > 0) {
  //         setWallet(accounts[0]);
  //         setStatus("👆🏽 Put BNB Amount in the text-field above.");
  //       } else {
  //         setWallet("");
  //         setStatus("🦊 Connect to Metamask using the top right button.");
  //       }
  //     })
  //   } else {
  //     setStatus("rendorcom");  
  //   }
  // };

  const rendercom = () => {
    return (
      <p>
        {" "}
        🦊{" "}
        <a target="_blank" href="https://metamask.io/download.html" rel="noreferrer">
          You must install Metamask, a virtual Ethereum wallet, in your
          browser.
        </a>
      </p>
    );  
  }

  return (
    <div>
        {/* <Button id="walletButton" onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            `Connected: ${String(walletAddress).substring(0, 6)}...${String(walletAddress).substring(38)}`
          ) : (
            <span>Connect Wallet</span>
          )}
        </Button> */}
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
            placeholder=""
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
            {status !== "rendercom" ? status : rendercom()}
          </Heading>
        </Heading>
      </div>
  );
};

export default NvdPresale;
