import React, { ChangeEvent, useEffect, useState } from "react";
import { Heading, Button, Input, Text } from '@pancakeswap/uikit'
import { formatBigNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
import { parseUnits, formatEther } from 'ethers/lib/utils'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useTokenPreSaleContract } from 'hooks/useContract'
import { getTokenPreSaleAddress } from 'utils/addressHelpers'
import { useGetBnbBalance, useGetTotalTokenSold, useGetNMDTokenprice } from './PreSaleTokenModal';

const NmdPresale = () => {

  const floorTokenAmount = 0.0001
  const floorGasPrice = 0.001

  const tokenPreSaleContract = useTokenPreSaleContract()
  const { onGetNMDTokenprice } = useGetNMDTokenprice()
  const { onGetTotalTokenSold } = useGetTotalTokenSold()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { account } = useWeb3React()
  const balanceOfTokenPreSale = useGetBnbBalance(getTokenPreSaleAddress())
  const balanceOfUser = useGetBnbBalance(account);

  const [tokenAmountPerBNB, setTokenAmountPerBNB] = useState(0);
  const [totaltokensold, setTotalTokenSold] = useState(0)
  const [raisedBNB, setRaisedBNB] = useState("");
  const [bnbAmount, setBNBAmount] = useState(0.0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [BNBStatus, setBNBStatus] = useState("");
  const [pendingTx, setPendingTx] = useState(false)
  const [timeup, setTimeup] = useState(false)
  const [count, setCount] = useState(false)
  const [status, setStatus] = useState("")

  setTimeout(() => {
    const set = !timeup
    setTimeup(set)
  }, 5000);
  
  useEffect(() => { // All get
    async function fetchData() {
        setPendingTx(true);
        try{
            setCount(timeup)
            setTokenAmountPerBNB(await onGetNMDTokenprice())
            setTotalTokenSold(await onGetTotalTokenSold())
            setRaisedBNB(formatBigNumber(balanceOfTokenPreSale, 6))
            setPendingTx(false);
        }
        catch (e)
        {
            console.error('Failed to Get', e)
            setPendingTx(false);
        }
    }
    fetchData();
  }, [onGetNMDTokenprice, tokenAmountPerBNB, onGetTotalTokenSold, totaltokensold, balanceOfUser, balanceOfTokenPreSale, timeup, setCount])

  const buyTokenAmountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(parseInt(evt.target.value)) === true)
    {
      setTokenAmount(0)
    }
    else
    {
      setTokenAmount(parseInt(evt.target.value))
    }
  };

  useEffect(() => {
    setBNBAmount(tokenAmount / tokenAmountPerBNB);
    if ((tokenAmount / tokenAmountPerBNB) < floorTokenAmount) setBNBStatus(`BNB Amount should be over ${floorTokenAmount}`);
    else setBNBStatus("");
  }, [tokenAmount, tokenAmountPerBNB])

  const handleBuyPressed = async () => { 

    if ((tokenAmount / tokenAmountPerBNB) < floorTokenAmount)
    {
        setStatus(`BNB Amount should be over ${floorTokenAmount}`)
        return false
    }
    
    if ( (parseFloat(formatEther(balanceOfUser)) === 0) || (bnbAmount - floorGasPrice > parseFloat(formatEther(balanceOfUser))))
    {
        setStatus(`BNB Amount is not enough. Your Wallet Amount: ${formatEther(balanceOfUser)}`)
        return false
    }
    
    setPendingTx(true)
    try{
        const tx = await callWithGasPrice(tokenPreSaleContract, 'buyTokens', [], { 
            value: parseUnits(bnbAmount.toString()) })
        const receipt = await tx.wait()

        if (receipt.transactionHash)
        {
            setStatus(`✅ Check out your transaction on bscscan: https://testnet.bscscan.com/tx/${receipt.transactionHash}`)
        }
        else
        {
            setStatus(`😥 transaction fail!`)
        }
        setPendingTx(false)
        return true
    }
    catch (e)
    {
        setPendingTx(false)
        setStatus(`😥 Something went wrong: ${e}`)
        return false
    }
  };
  const renderStatusString = () => {
    return (
      <p>
        {" "}
        🦊{" "}
        <a target="_blank" href="https://metamask.io/download.html" rel="noreferrer">
          You must install Metamask, in your browser.
        </a>
      </p>
    );  
  }

  return (
    <div>
        <Heading scale="xl" color="secondary" mb="10px" textAlign="center">
          
          <Heading scale="xxl" color="blue" mb="24px" >
            PRESALE ICO LAUNCH
          </Heading>

          <Heading scale="xl" color="secondary" mb="10px">
          Total Raised: {raisedBNB} BNB
          </Heading>
          <Heading scale="xl" color="secondary" mb="10px">
          Total Token Sold: {totaltokensold} NMD
          </Heading>

          <Heading scale="xl" color="secondary" mb="10px">
          Token Price: { 1 / tokenAmountPerBNB }  BNB
          </Heading>

          <Heading scale="xl" color="secondary" mb="10px">
          NMD amount
          </Heading>

          <Input
            id="buyTokenAmount"
            placeholder=""
            value={tokenAmount}
            onChange={buyTokenAmountChange}
            style={{ position: 'relative', marginLeft: (window.innerWidth - 120)/2 , zIndex: 16, paddingRight: '10px', maxWidth: '110px', textAlign: 'right'}}
          />

          <Heading scale="xl" color="secondary" mb="10px">
          BNB Amount :
            { bnbAmount } BNB
          </Heading>

          <Heading color='red' mb="16px">
          {BNBStatus}
          </Heading>

          <Button id="buyButton" onClick={handleBuyPressed} >
            BUY NMD Token
          </Button>

          <Heading id = "status" color='red' mb="16px">
            {status !== "renderStatusString" ? status : renderStatusString()}
          </Heading>
        </Heading>
      </div>
  );
};

export default NmdPresale;
