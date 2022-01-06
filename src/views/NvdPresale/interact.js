import React from 'react';
import { useWeb3React } from '@web3-react/core';
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

// let walletProvider = null;
const walletProvider = null;
// let connectedUserAddress = null;
const connectedUserAddress = null;
const transactionDataToDjango = {
  from_taken: '',
  to: '',
  token_quantity: 0,
  bnb_received: 0,
  transaction_id: '',
  ip_address: '127.0.0.1',
  transaction_status: ''
}


/*
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: {
        97: 'https://data-seed-prebsc-2-s3.binance.org:8545/'
      },
      qrcode: true,
      chainId: 97,
      infuraId: "460f40a260564ac4a4f4b3fffb032dad", // required
      bridge: "https://bridge.walletconnect.org"
    }
  }
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: false, // optional
  disableInjectedProvider: false,
  providerOptions // required
});

export const connectWalletUsingWeb3 = async () => {
  try {
    // console.log("connectWalletUsingWeb3");
    await web3Modal.clearCachedProvider();
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);

    web3.eth.extend({
      methods: [
        {
          name: "chainId",
          call: "eth_chainId",
          outputFormatter: web3.utils.hexToNumber
        }
      ]
    });

    const chainId = await web3.eth.chainId();
    if (chainId !== 97) {
      return {
        address: "",
        status: "🦊 Please connect to the BSC Testnet."
      }
    }

    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    walletProvider = provider;
    // console.log(address);
    connectedUserAddress = address;
    // const balance = await web3.eth.getBalance(address);
    // const networkId = await web3.eth.net.getId();
    // const chainId = await web3.eth.chainId();
    // const currentAccountTruncated = this.smartTrim(address, 16) + ' '

    
    if (accounts.length > 0) {
        return {
            address: `${address}`,
            status: "👆🏽 Put BNB Amount in the text-field above.",
        }
    } 
    return {
      address: "",
      status: "🦊 Connect to Wallet using the top right button.",
    }
  } catch(err) {
      return {
          address: "",
          status: `😥 ${err}`
      }
  }
}
*/

// const getWalletAccount = () => {
//   const { account } = useWeb3React();
//   console.log(account);
//   connectedUserAddress = account;
// }

export const isWalletConnected = () => {
  // getWalletAccount();
  if (walletProvider !== null && walletProvider !== undefined ) return true;
  return false;
}

// export const disconnectWallet = async () => {
//     await web3Modal.clearCachedProvider()
//     walletProvider = null;
//     console.log("walletProvider ", walletProvider);
// };

export const getCurrentWalletConnected = async () => {
  if (isWalletConnected()) {
    const web3 = new Web3(walletProvider);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    return {
      address: `${address}`,
      status: `👆🏽 Put BNB Amount in the text-field above.`
    }
  }
  return {
    address: "",
    status: `🦊 Connect to Wallet using the top right button.`,
  }
}

export const getTotalRaisedAmount = async () => {
    const web3 = new Web3('https://data-seed-prebsc-2-s3.binance.org:8545/');
    let bnbAmount = await web3.eth.getBalance(contractAddress);
    bnbAmount = web3.utils.fromWei(bnbAmount, 'ether');
    return bnbAmount;
}


function getIP(json) {
    return json.ip;
  }

export const buyToken = async (bnbAmount) => {
    
    if (!walletProvider) return {
      success: false,
      status: "🦊 Connect to Wallet using the top right button",
    };
    const web3 = new Web3(walletProvider);
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
            status: `✅ Check out your transaction on bscscan: https://testnet.bscscan.com/tx/${txHash}`
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
        // .then((res) => {} );
        .then();
        // Added Upto this //


        return {
            success: false,
            status: `😥 Something went wrong: ${error}`
        }
    }
} 
