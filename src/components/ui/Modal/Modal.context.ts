import { createSafeContext } from '@/utils/createSafeContext'

interface ModalContext {
  onClose?: () => void
  isShowClose?: boolean
}

export const [ModalProvider, useModalContext] = createSafeContext<ModalContext>(
  'Modal component was not found in tree',
)
