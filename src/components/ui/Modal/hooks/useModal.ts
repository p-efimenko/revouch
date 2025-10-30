import type { ModalProps } from '@/components/ui/Modal'
import type { ModalId } from '@/components/modals'
import { useModalsStore } from '../store/modals-store-provider'

export function useModal<Props extends ModalProps | undefined = ModalProps>(id: ModalId) {
  const open = useModalsStore(state => state.open)
  const close = useModalsStore(state => state.close)
  const destroy = useModalsStore(state => state.destroy)
  const isOpen = useModalsStore(state => state.modals[id]?.isOpen ?? false)

  return {
    isOpen,
    open: (props?: Props) => open({ id, props }),
    close: () => close(id),
    destroy: () => destroy(id),
  }
}
