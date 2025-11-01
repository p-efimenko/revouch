import { Stack, Button } from '@mui/material'
import { Modal } from '@/components/ui'
import type { UserDataResponseDto } from '@/api/models'

type UnfollowModalProps = {
  user: UserDataResponseDto
  isOpen: boolean
  onClose: () => void
  onDestroy: () => void
  onUnfollow: () => void
}

export const UnfollowModal = (props: UnfollowModalProps) => {
  const { isOpen, onClose, onDestroy, user, onUnfollow } = props

  const title = `Unfollow ${user.fullName}?`

  const handleUnfollow = () => {
    onUnfollow()
    onClose()
  }

  return (
    <Modal width={320} isOpen={isOpen} onClose={onClose} onDestroy={onDestroy}>
      <Modal.Header title={title} />
      <Modal.Footer>
        <Stack spacing={8} px={24} pb={24} width="100%">
          <Button onClick={handleUnfollow} variant="warning" size="extra-large" fullWidth>
            Remove
          </Button>

          <Button onClick={onClose} variant="outlined" size="extra-large" fullWidth>
            Cancel
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  )
}