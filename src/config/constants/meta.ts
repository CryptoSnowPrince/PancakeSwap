import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Namo Mudra',
  description:
    'The most popular NMD token! Buy NMD Token for yourself!',
  image: '',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `Presale ICO Launch`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('Namo Mudra')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('Namo Mudra')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('Namo Mudra')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('Namo Mudra')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('Namo Mudra')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('Namo Mudra')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('Namo Mudra')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('Namo Mudra')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Namo Mudra')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('Namo Mudra')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Namo Mudra')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('Namo Mudra')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('Namo Mudra')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Namo Mudra')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('Namo Mudra')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('Namo Mudra')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('Namo Mudra')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('Namo Mudra Info & Analytics')}`,
        description: 'View statistics for Namo Mudra exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('Namo Mudra Info & Analytics')}`,
        description: 'View statistics for Namo Mudra exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('Namo Mudra Info & Analytics')}`,
        description: 'View statistics for Namo Mudra exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('Namo Mudra')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('Namo Mudra')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('Namo Mudra')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('Namo Mudra')}`,
      }
    default:
      return null
  }
}
