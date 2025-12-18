import { useAtom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const userExpertModeAtom = atomWithStorage<boolean>('pcs:expert-mode', false)
const userIsExpertModeSetByUser = atomWithStorage<boolean>('pcs:is-expert-mode-set-by-user', false)
const userExpertModeAcknowledgementAtom = atomWithStorage<boolean>('pcs:expert-mode-acknowledgement', true)

export function useIsExpertModeSetByUser() {
  return useAtom(userIsExpertModeSetByUser)
}

export function useExpertMode() {
  const [expertMode, setExpertMode] = useAtom(userExpertModeAtom)
  const [, setIsExpertModeSetByUser] = useIsExpertModeSetByUser()
  return [
    Boolean(expertMode),
    (expertMode: Parameters<typeof setExpertMode>[0], setByUser = true) => {
      setExpertMode(expertMode)
      setIsExpertModeSetByUser(setByUser)
    },
  ] as const
}

export function useIsExpertMode() {
  return useAtomValue(userExpertModeAtom)
}

export function useUserExpertModeAcknowledgement() {
  return useAtom(userExpertModeAcknowledgementAtom)
}
