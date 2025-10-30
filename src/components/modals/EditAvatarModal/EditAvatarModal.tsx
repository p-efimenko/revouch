import { Icon, Modal, Spinner } from '@/components/ui'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useUpdateAvatarMutation } from '@/services'
import { useCallback, useEffect, useState } from 'react'
import type { ErrorType } from '@/types'
import { getFileFromCroppedImage } from './utils'
import { AvatarEditor } from './components'
import type { Area } from 'react-easy-crop'
import { useDropzone } from 'react-dropzone'
import { showToast } from '@/utils/showToast'

type EditAvatarModalProps = {
  isOpen: boolean
  src?: string
  onClose: () => void
  onDestroy: () => void
}

const MODAL_CONTENT_HEIGHT = 367
const MAX_IMAGE_SIZE = 1024 * 1024 * 5

export const EditAvatarModal = (props: EditAvatarModalProps) => {
  const { isOpen, onClose, onDestroy, src = '' } = props
  const [fileInputKey, setFileInputKey] = useState(0)
  const [isEdited, setIsEdited] = useState(false)
  const [croppedArea, setCroppedArea] = useState<Area>()
  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation()
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>(src)

  const handleFileChange = useCallback(async (files: File[] | null) => {
    const file = files ? files[0] : null

    try {
      if (!file) return

      if (file.size > MAX_IMAGE_SIZE) {
        showToast.error('Upload failed. File is too large')
      } else {
        setSelectedFileUrl(URL.createObjectURL(file))
        setIsEdited(true)
      }
    } catch (error) {
      console.error(error)
    } finally {
      /* force re-render to allow picking same file again */
      setFileInputKey(prevKey => prevKey + 1)
    }
  }, [])

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    multiple: false,
    noClick: true,
    noKeyboard: true,
    onDrop: handleFileChange,
  })

  useEffect(() => {
    return () => {
      if (selectedFileUrl) {
        URL.revokeObjectURL(selectedFileUrl)
      }
    }
  }, [selectedFileUrl])

  const handleApply = async () => {
    try {
      if (!selectedFileUrl || !croppedArea) return

      const file = await getFileFromCroppedImage(selectedFileUrl, croppedArea)
      await updateAvatar(file).unwrap()
      onClose()
    } catch (error) {
      console.error(error)
      showToast.error((error as ErrorType).data.message)
    }
  }

  return (
    <Modal isOpen={isOpen} width={518} onClose={onClose} onDestroy={onDestroy}>
      <Modal.Header title="Set Up Profile Photo" />

      <Modal.Body
        sx={{
          minHeight: MODAL_CONTENT_HEIGHT,
          height: '100%',
          padding: 0,
          bgcolor: isDragActive ? 'primary_shades.p12' : 'backgrounds.beige',
          overflow: 'hidden',
        }}
      >
        {selectedFileUrl ? (
          <AvatarEditor
            height={MODAL_CONTENT_HEIGHT}
            onCrop={area => {
              setIsEdited(true)
              setCroppedArea(area)
            }}
            onCancel={() => setSelectedFileUrl('')}
            onZoomChange={() => setIsEdited(true)}
            url={selectedFileUrl}
          />
        ) : isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={MODAL_CONTENT_HEIGHT} py="24px">
            <Spinner size={40} />
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height={MODAL_CONTENT_HEIGHT}
            textAlign="center"
            gap={5}
            {...getRootProps()}
          >
            Drag’n’Drop Image Here
            <div>or</div>
            <Button
              variant="outlined"
              color="primary"
              component="label"
              endIcon={<Icon name="upload" />}
              sx={{ mb: 3 }}
            >
              Select To Upload
              <input
                hidden
                key={fileInputKey}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={event => handleFileChange(Array.from(event.target.files || []))}
                {...getInputProps()}
              />
            </Button>
            <Typography variant="body2" color="suggestion.secondary">
              JPEG, JPG or PNG (max. 5 MB)
            </Typography>
          </Box>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Stack direction="row" spacing={2} p={4} justifyContent="space-between" width="100%">
          <Button
            onClick={() => setSelectedFileUrl('')}
            variant="footer"
            disabled={!selectedFileUrl}
            sx={({ palette }) => ({ color: palette.error.dark })}
          >
            Remove photo
          </Button>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              pr: 2,
            }}
          >
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button
              disabled={isLoading || !selectedFileUrl || !isEdited}
              variant="contained"
              color="primary"
              onClick={handleApply}
            >
              Apply
            </Button>
          </Box>
        </Stack>
      </Modal.Footer>
    </Modal>
  )
}
