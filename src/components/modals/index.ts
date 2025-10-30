import { TestModal } from './TestModal'

export const MODALS = {
  TestModal: TestModal,
} as const

export type ModalId = keyof typeof MODALS
