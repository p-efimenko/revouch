import type { ModalId } from '@/components/modals'

export interface ModalProps {
  [name: string]: any
}

export type ModalType<Props = ModalProps> = {
  id: ModalId
  isOpen: boolean
  props?: Props
}

export type ModalMap = Partial<Record<ModalId, ModalType<ModalProps>>>
