import React, { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import { getTokenPreSaleAddress } from 'utils/addressHelpers'
import { simpleRpcProvider } from 'utils/providers'

import { useTokenPreSaleContract } from 'hooks/useContract'

export const useGetBnbBalance = () => {
  const [balance, setBalance] = useState(ethers.BigNumber.from(0))
  const account = getTokenPreSaleAddress();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const walletBalance = await simpleRpcProvider.getBalance(account)
        setBalance(walletBalance)
      } catch(e) {
        console.error('Failed to setTokenPrice', e)
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [setBalance, account])

  return balance
}

export const useSetNMDTokenprice = () => {
  const tokenPreSaleContract = useTokenPreSaleContract()

  const handleSetNMDTokenprice = useCallback(
    async ( tokenprice : number) => {
      try {
        await tokenPreSaleContract.setTokenPrice(tokenprice)
      } catch(e)
      {
        console.error('Failed to setTokenPrice', e)
      }
    },
    [tokenPreSaleContract],
  )

  return { onSetNMDTokenprice: handleSetNMDTokenprice }
}

export const useGetNMDTokenprice = () => {
  const tokenPreSaleContract = useTokenPreSaleContract()

  const handleGetNMDTokenprice = useCallback(
    async () => {
      try {
        const tokenAmountPerBNB = await tokenPreSaleContract.getTokenPrice()
        return tokenAmountPerBNB.toNumber()
      } catch(e)
      {
        console.error('Failed to setTokenPrice', e)
        return NaN;
      }
    },
    [tokenPreSaleContract],
  )

  return { onGetNMDTokenprice: handleGetNMDTokenprice }
}

export const useGetTotalTokenSold = () => {
  const tokenPreSaleContract = useTokenPreSaleContract()

  const handleGetTotalTokenSold = useCallback(
    async () => {
      try {
        const totaTokeSold = await tokenPreSaleContract.totalsold()
        return totaTokeSold.toNumber()
      } catch(e)
      {
        console.error('Failed to setTokenPrice', e)
        return NaN;
      }
    },
    [tokenPreSaleContract],
  )

  return { onGetTotalTokenSold: handleGetTotalTokenSold }
}

export const buyTokenUsingBNB = async (
  contract: ethers.Contract,
  collectionAddress: string,
  tokenId: number,
): Promise<string> => {
  try {
    const tx = await contract.buyTokenUsingBNB(collectionAddress, tokenId)
    const receipt = await tx.wait()
    return receipt.transactionHash
  } catch (error) {
    console.error(error)
    return null
  }
}

export const useBuyNMDToken = () => {
  const tokenPreSaleContract = useTokenPreSaleContract()

  const handleBuyNMDToken = useCallback(
    async () => {
      try {
        const tx = await tokenPreSaleContract.buyTokens()
        const receipt = await tx.wait()
        return receipt.transactionHash
      } catch(e)
      {
        console.error('Failed to BuyToken', e)
        return null
      }
    },
    [tokenPreSaleContract],
  )

  return { onBuyNMDToken: handleBuyNMDToken }
}
