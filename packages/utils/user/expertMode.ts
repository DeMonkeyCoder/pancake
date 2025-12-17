import { useAtom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const userExpertModeAtom = atomWithStorage<boolean>('pcs:expert-mode', false)
const userIsExpertModeSetByUser = atomWithStorage<boolean>('pcs:is-expert-mode-set-by-user', false)
const userExpertModeAcknowledgementAtom = atomWithStorage<boolean>('pcs:expert-mode-acknowledgement', true)

export function useIsExpertModeSetByUser() {
  return useAtom(userIsExpertModeSetByUser)
}

export function useExpertMode() {
  const [expertMode, setExpertMode, ...rest] = useAtom(userExpertModeAtom)
  const [, setIsExpertModeSetByUser] = useIsExpertModeSetByUser()
  return [
    Boolean(expertMode),
    (expertMode: boolean, setByUser = true) => {
      setExpertMode(expertMode)
      setIsExpertModeSetByUser(setByUser)
    },
    ...rest,
  ] as const
}

export function useIsExpertMode() {
  return useAtomValue(userExpertModeAtom)
}

export function useUserExpertModeAcknowledgement() {
  return useAtom(userExpertModeAcknowledgementAtom)
}
