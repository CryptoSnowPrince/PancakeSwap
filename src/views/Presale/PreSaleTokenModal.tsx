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

export const useBuyNMDToken = () => {
  const tokenPreSaleContract = useTokenPreSaleContract()

  const handleBuyNMDToken = useCallback(
    async ( tokenprice : number) => {
      try {
        // await tokenPreSaleContract.setTokenPrice(tokenprice)
        //
      } catch(e)
      {
        console.error('Failed to BuyToken', e)
      }
    },
    [],
  )

  return { onBuyNMDToken: handleBuyNMDToken }
}

// export const useSetNMDTokenprice = () => {
//   const dispatch = useAppDispatch()
//   const { account } = useWeb3React()
//   const masterChefContract = useMasterchef()
//   const sousChefContract = useSousChef(sousId)

//   const handleSetNMDTokenprice = useCallback(
//     async (amount: string, decimals: number) => {
//       if (sousId === 0) {
//         await stakeFarm(masterChefContract, 0, amount)
//       } else if (isUsingBnb) {
//         await sousStakeBnb(sousChefContract, amount)
//       } else {
//         // await sousStake(sousChefContract, amount, decimals)
//         await stakeFarm(masterChefContract, sousId, amount)
//       }
//       dispatch(updateUserStakedBalance(sousId, account))
//       dispatch(updateUserBalance(sousId, account))
//     },
//     [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId],
//   )

//   return { onSetNMDTokenprice: handleSetNMDTokenprice }
// }

export const GetTokenPrice = () => {
  const [tokenAmountPerBNB, setNMDTokenPrice] = useState(0)
  const tokenPreSaleContract = useTokenPreSaleContract()

  useEffect(() => {
    const fetchBurnedCakeAmount = async () => {
      try {
        const price = await tokenPreSaleContract.getTokenPrice()
        setNMDTokenPrice(price.toNumber());
      } catch (error) {
        console.error('Failed to fetch burned auction cake', error)
      }
    }
    fetchBurnedCakeAmount()
  }, [tokenAmountPerBNB, tokenPreSaleContract])
  return tokenAmountPerBNB
}

export const SetTokenPrice = (newtokenprice) => {
  const tokenPreSaleContract = useTokenPreSaleContract()

  const fetchBurnedCakeAmount = async () => {
    try {
      await tokenPreSaleContract.setTokenPrice(newtokenprice)
      return true
    } catch (error) {
      console.error('Failed to fetch burned auction cake', error)
      return false
    }
  }
  fetchBurnedCakeAmount()
}

export const BuyToken = (bnbAmount) => {
  const [tokenAmountPerBNB, setNMDTokenPrice] = useState(0)
  const tokenPreSaleContract = useTokenPreSaleContract()

  useEffect(() => {
    const fetchBurnedCakeAmount = async () => {
      try {
        const price = await tokenPreSaleContract.getTokenPrice()
        setNMDTokenPrice(price.toNumber());
      } catch (error) {
        console.error('Failed to fetch burned auction cake', error)
      }
    }
    fetchBurnedCakeAmount()
  }, [tokenAmountPerBNB, tokenPreSaleContract])
  return { tokenAmountPerBNB }
}