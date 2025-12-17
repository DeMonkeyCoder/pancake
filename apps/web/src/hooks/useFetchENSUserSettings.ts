import { useExpertMode, useIsExpertModeSetByUser } from '@pancakeswap/utils/user'
import { useEffect } from 'react'
import { useAccount, useEnsName, useEnsText } from 'wagmi'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { normalize } from 'viem/ens'
import { ChainId } from '@pancakeswap/chains'

export const useFetchENSUserSettings = () => {
  const { address } = useAccount()
  const { chainId } = useActiveChainId()
  const { data: ensName } = useEnsName({
    address,
    chainId: chainId === ChainId.SEPOLIA ? ChainId.SEPOLIA : ChainId.ETHEREUM,
    query: {
      enabled: chainId !== ChainId.BSC && chainId !== ChainId.BSC_TESTNET,
    },
  })

  const [isExpertModeSetByUser] = useIsExpertModeSetByUser()
  const [expertMode, setExpertMode] = useExpertMode()
  const { data: expertModeENS } = useEnsText({
    name: normalize(ensName ?? ''),
    key: 'swapExpertMode',
  })
  useEffect(() => {
    if (!isExpertModeSetByUser && expertModeENS !== undefined && expertModeENS !== null) {
      setExpertMode(expertModeENS === 'true', false)
    }
  }, [isExpertModeSetByUser, expertMode, setExpertMode, expertModeENS])
  return null
}
