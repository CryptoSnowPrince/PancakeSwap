import React from 'react'

const NvdPresale = () => {
  const raisedBNB = 0.1;
  const tokenAmount = 1000000;
  const bnbAmount = 10;

  return (
    <div className="Minter" align = "center">
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
};

export default NvdPresale;
