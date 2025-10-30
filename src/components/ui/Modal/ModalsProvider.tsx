import { useCallback, useMemo } from 'react'
import { type ModalId, MODALS } from '@/components/modals'
import { useModalsStore } from './store/modals-store-provider'
import type { ModalProps } from './types/index'

interface ModalsProviderProps {
  modals: typeof MODALS
  children: React.ReactNode
}

export const ModalsProvider = ({ children, modals: components }: ModalsProviderProps) => {
  const modals = useModalsStore(state => state.modals)
  const close = useModalsStore(state => state.close)
  const destroy = useModalsStore(state => state.destroy)

  const ids = useMemo<ModalId[]>(() => Object.keys(modals) as ModalId[], [modals])

  const onClose = useCallback(
    (id: ModalId) => close(id),
    [close],
  )

  const onDestroy = useCallback(
    (id: ModalId) => destroy(id),
    [destroy],
  )

  const getIsOpenState = (id: ModalId): boolean => {
    return modals[id as keyof typeof modals]?.isOpen ?? false
  }

  const getModalProps = (id: ModalId): ModalProps => {
    return modals[id as keyof typeof modals]?.props ?? {}
  }

  return (
    <>
      {children}

      {ids.map(id => {
        const ModalComponent = components[id]

        if (!ModalComponent) return null

        return (
          <ModalComponent
            key={id}
            isOpen={getIsOpenState(id)}
            onClose={() => onClose(id)}
            onDestroy={() => onDestroy(id)}
            {...getModalProps(id)}
          />
        )
      })}
    </>
  )
}
