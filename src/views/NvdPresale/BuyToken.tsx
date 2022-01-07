import React, { useState, useEffect } from 'react'
import { Text } from '@pancakeswap/uikit'
import { useFarmAuctionContract, useTokenPreSaleContract, useNMDTokenContract } from 'hooks/useContract'
import { getBalanceNumber } from 'utils/formatBalance'
import { ethersToBigNumber } from 'utils/bigNumber'

const BuyToken = () => {
  const [burnedCakeAmount, setBurnedCakeAmount] = useState(0)
  const [tokenprice, setNMDTokenPrice] = useState(0)
  const farmAuctionContract = useFarmAuctionContract()
  const tokenPreSaleContract = useTokenPreSaleContract()
  // const NMDTokenContract = useNMDTokenContract()

  useEffect(() => {
    const fetchBurnedCakeAmount = async () => {
      try {
        const amount = await farmAuctionContract.totalCollected()
        const price = await tokenPreSaleContract.getTokenPrice()
        setNMDTokenPrice(price.toNumber());
        const amountAsBN = ethersToBigNumber(amount)
        setBurnedCakeAmount(getBalanceNumber(amountAsBN))
      } catch (error) {
        console.error('Failed to fetch burned auction cake', error)
      }
    }
    fetchBurnedCakeAmount()
  }, [burnedCakeAmount, farmAuctionContract, tokenPreSaleContract])
  return (
    <Text fontSize="24px" bold>
      Tokenprice {tokenprice}
    </Text>
  )
}

export default BuyToken
