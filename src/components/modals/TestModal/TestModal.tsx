import { Modal } from '@/components/ui'
import { Stack, Button } from '@mui/material'

type TestModalProps = {
  isOpen: boolean
  onClose: () => void
  onDestroy: () => void
}

export const TestModal = (props: TestModalProps) => {
  const { isOpen, onClose, onDestroy } = props


  return (
    <Modal width={400} isOpen={isOpen}onClose={onClose} onDestroy={onDestroy}>
      <Modal.Header title="Test Modal" />

      <Modal.Body>
        Test Modal Content
      </Modal.Body>

      <Modal.Footer>
        <Stack direction="row" spacing={2} p={4}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button>
            Save
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  )
}