import { useState } from 'react'
import { Box, Slider, Stack } from '@mui/material'
import Cropper, { type Area, type CropperProps } from 'react-easy-crop'
import { Icon } from '@/components/ui'

type AvatarEditorProps = {
  url: string
  height: number
  onCrop: (croppedArea: Area) => void
  onCancel: () => void
  onZoomChange: (zoom: number) => void
}

export const AvatarEditor = (props: AvatarEditorProps) => {

  const { url, height, onCrop, onZoomChange } = props

  const [crop, setCrop] = useState({ x: 1, y: 1 })
  const [zoom, setZoom] = useState(2)

  const onCropChange: CropperProps['onCropChange'] = cropLocation => {
    setCrop(cropLocation)
  }

  const onCropComplete: CropperProps['onCropComplete'] = (_, croppedAreaPixels) => {
    onCrop(croppedAreaPixels)
  }

  const onInternalZoomChange = (zoom: number) => {
    setZoom(zoom)
    onZoomChange(zoom)
  }

  return (
    <>
      <Box height={height} position="relative">
        <Cropper
          image={url}
          style={{
            cropAreaStyle: {
              border: 'none',
            },
          }}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropSize={{ width: 300, height: 300 }}
          cropShape="round"
          objectFit="cover"
          showGrid={false}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onInternalZoomChange}
        />
      </Box>

      <Stack
        direction="row"
        spacing={16}
        alignItems="center"
        p={24}
        bgcolor="black.100"
        color="black.600"
      >
        <Icon name="image" size={16} />

        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(_, zoom) => onInternalZoomChange(zoom as number)}
          sx={{ width: '100%' }}
        />

        <Icon name="image" size={16} />
      </Stack>
    </>
  )
}
