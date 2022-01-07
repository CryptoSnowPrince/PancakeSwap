import React, { ChangeEvent, useEffect, useState } from "react";
import { Heading, Button, Input } from '@pancakeswap/uikit'
import { formatBigNumber } from 'utils/formatBalance'
import { useGetBnbBalance, useGetTotalTokenSold, useGetNMDTokenprice, useBuyNMDToken } from './PreSaleTokenModal';

const NmdPresale = () => {

  const floorTokenAmount = 0.00001

  const { onGetNMDTokenprice } = useGetNMDTokenprice()
  const { onGetTotalTokenSold } = useGetTotalTokenSold()
  const { onBuyNMDToken } = useBuyNMDToken()
  const balance = useGetBnbBalance()

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
            setRaisedBNB(formatBigNumber(balance, 6))
            setPendingTx(false);
        }
        catch (e)
        {
            console.error('Failed to Get', e)
            setPendingTx(false);
        }
    }
    fetchData();
  }, [onGetNMDTokenprice, tokenAmountPerBNB, onGetTotalTokenSold, totaltokensold, balance, timeup, setCount])

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
        return false;
    }

    setPendingTx(true);
    try{
        const txHash = await onBuyNMDToken()
        setPendingTx(false);
        setStatus(`✅ Check out your transaction on bscscan: https://testnet.bscscan.com/tx/${txHash}`)
        return true
    }
    catch (e)
    {
        setPendingTx(false)
        setStatus(`😥 Something went wrong: ${e}`)
        return true
    }
  };

  const renderStatusString = () => {
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
        <Heading scale="xl" color="secondary" mb="24px" textAlign="center">
        Total Raised: {raisedBNB} BNB
          <Heading scale="xl" color="secondary" mb="24px">
          Total Token Sold: {totaltokensold} NMD
          </Heading>

          <Heading scale="xl" color="secondary" mb="24px">
          Token Price: { 1 / tokenAmountPerBNB }  BNB
          </Heading>

          <Heading scale="xl" color="secondary" mb="24px">
          NMD amount
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

          <Button id="buyButton" onClick={handleBuyPressed} >
            BUY NMD Token
          </Button>

          <Heading id = "status" color='red' mb="20px">
            {status !== "renderStatusString" ? status : renderStatusString()}
          </Heading>

          <Heading id = "pending" color='red' mb="20px">
            {pendingTx === true ? "pending" : ""}
            count={count.toString()}
          </Heading>
        </Heading>
      </div>
  );
};

export default NmdPresale;
