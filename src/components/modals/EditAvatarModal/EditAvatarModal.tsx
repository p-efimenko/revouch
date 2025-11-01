'use client'

import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useToast } from '@/hooks'
import { useUploadUserAvatar } from '@/hooks/api/user'


import { Button, Stack, Typography, IconButton } from '@mui/material'
import { Icon, Modal, Spinner, Center } from '@/components/ui'

import { AvatarEditor } from './components'
import { getFileFromCroppedImage } from './utils'

import type { Area } from 'react-easy-crop'

type EditAvatarModalProps = {
  isOpen: boolean
  src?: string
  onClose: () => void
  onDestroy: () => void
}

const MODAL_CONTENT_HEIGHT = 367
const MAX_FILE_SIZE_MB = 10
const MAX_FILE_SIZE_BYTES = 1024 * 1024 * MAX_FILE_SIZE_MB

export const EditAvatarModal = (props: EditAvatarModalProps) => {
  const { isOpen, onClose, onDestroy, src = '' } = props

  const [fileInputKey, setFileInputKey] = useState(0)
  const [isEdited, setIsEdited] = useState(false)
  const [croppedArea, setCroppedArea] = useState<Area>()
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>(src)

  const toast = useToast()

  const { mutateAsync: uploadUserAvatar, isPending } = useUploadUserAvatar()

  const handleFileChange = useCallback(async (files: File[] | null) => {
    const file = files ? files[0] : null

    try {
      if (!file) return

      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast.error('Upload failed. File is too large')
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
    onDropAccepted: () => {},
    onDropRejected: (fileRejections) => {
      console.log(fileRejections)
    },
  })

  useEffect(() => {
    return () => {
      if (selectedFileUrl) {
        URL.revokeObjectURL(selectedFileUrl)
      }
    }
  }, [selectedFileUrl])

  const handleApply = async () => {
    if (!selectedFileUrl || !croppedArea) return
    // step 1: get cropped image
    const file = await getFileFromCroppedImage(selectedFileUrl, croppedArea)
    // step 2: upload cropped image
    await uploadUserAvatar(file)
    // step 3: close modal
    onClose()
  }

  return (
    <Modal isOpen={isOpen} width={518} onClose={onClose} onDestroy={onDestroy} scroll="body">
      <Modal.Header title="Set Up Profile Photo" />

      <Modal.Body
        sx={{
          minHeight: MODAL_CONTENT_HEIGHT,
          padding: 0,
          overflow: 'hidden',
        }}
      >
        {selectedFileUrl ? (
          <AvatarEditor
            url={selectedFileUrl}
            height={MODAL_CONTENT_HEIGHT}
            onCrop={(area) => {
              setIsEdited(true)
              setCroppedArea(area)
            }}
            onCancel={() => setSelectedFileUrl('')}
            onZoomChange={() => setIsEdited(true)}
          />
        ) : isPending ? (
          <Center>
            <Spinner size={40} />
          </Center>
        ) : (
          <Center
            height={MODAL_CONTENT_HEIGHT}
            {...getRootProps()}
          >
            <Stack direction="column" spacing={16} textAlign="center">
              <Stack spacing={4}>
                <Typography variant="h4">Drag&apos;n&apos;Drop Image Here</Typography>
                <Typography variant="p3">or</Typography>
              </Stack>

              <Button variant="outlined" component="label">
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

              <Typography variant="p3" color="black.500">
                JPEG, JPG, PNG (max. {MAX_FILE_SIZE_MB} MB)
              </Typography>
            </Stack>
          </Center>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Stack
          direction="row"
          spacing={24}
          px={24}
          py={20}
          justifyContent="space-between"
          width="100%"
        >
          <IconButton
            onClick={() => setSelectedFileUrl('')}
            disabled={isPending || !selectedFileUrl}
            color="error"
          >
            <Icon name="trash" size={16} />
          </IconButton>

          <Stack direction="row" spacing={8}>
            <Button onClick={onClose} variant="outlined" disabled={isPending}>
              Cancel
            </Button>

            <Button
              loading={isPending}
              disabled={!selectedFileUrl || !isEdited}
              variant="contained"
              color="primary"
              onClick={handleApply}
            >
              Apply
            </Button>
          </Stack>

        </Stack>
      </Modal.Footer>
    </Modal>
  )
}
