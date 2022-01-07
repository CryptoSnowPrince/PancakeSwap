import React, { ChangeEvent, useEffect, useState } from "react";
import { Heading, Button, Input } from '@pancakeswap/uikit'
import { formatBigNumber } from 'utils/formatBalance'
import { useGetBnbBalance, useSetNMDTokenprice, useGetTotalTokenSold, useGetNMDTokenprice, useBuyNMDToken } from './PreSaleTokenModal';

const NmdPresale = () => {
    
  const { onSetNMDTokenprice } = useSetNMDTokenprice()
  const { onGetNMDTokenprice } = useGetNMDTokenprice()
  const { onGetTotalTokenSold } = useGetTotalTokenSold()
  const { onBuyNMDToken } = useBuyNMDToken()
  const balance = useGetBnbBalance()
  
  const [tokenAmountPerBNB, setTokenAmountPerBNB] = useState(0);
  const [totaltokensold, setTotalTokenSold] = useState(0)
  const [raisedBNB, setRaisedBNB] = useState("");
  const [status, setStatus] = useState("");
  const [bnbAmount, setBNBAmount] = useState(0.0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [BNBStatus, setBNBStatus] = useState("");
  const [pendingTx, setPendingTx] = useState(false)
  const [timeup, setTimeup] = useState(false)
  const [count, setCount] = useState(false)

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
    setBNBAmount(tokenAmount / 100000);
    if ((tokenAmount / 100000) < 0.01) setBNBStatus("BNB Amount should be over 0.01");
    else setBNBStatus("");
  }, [tokenAmount])

  useEffect(() => {
    async function fetchData() {
    //   const raisedAmount = await getTotalRaisedAmount();
    //   setRaisedBNB(parseInt(raisedAmount));
      // console.log("raisedAmount =", raisedAmount);
    }
    fetchData();
  }, [status])
  
  const handleBuyPressed = async () => { 
    setPendingTx(true);
    try{
    setPendingTx(false);
    }
    catch (e)
    {
    setPendingTx(false);
    }
  };
  
  const handleTestFunc = async () => { 
    setPendingTx(true);
    try{
      await onSetNMDTokenprice(100000)
      setPendingTx(false);
    }

    catch (e)
    {
      console.error('Failed to setTokenPrice', e)
      setPendingTx(false);
    }
  };

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
          <Button id="testBTN" onClick={handleTestFunc} >
            testBTN
          </Button>
          <Heading id = "status" color='red' mb="20px">
            {status !== "rendercom" ? status : rendercom()}
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
