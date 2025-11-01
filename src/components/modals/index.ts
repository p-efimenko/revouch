import { EditAvatarModal } from './EditAvatarModal'
import { TestModal } from './TestModal'
import { UnfollowModal } from './UnfollowModal'

export const MODALS = {
  TestModal: TestModal,
  UnfollowModal: UnfollowModal,
  EditAvatarModal: EditAvatarModal,
} as const

export type ModalId = keyof typeof MODALS
