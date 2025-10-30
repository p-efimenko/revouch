import { useState } from 'react'
import { Box, Slider, Typography } from '@mui/material'
import Cropper, { type Area, type CropperProps } from 'react-easy-crop'
import { Icon } from '@/components/ui'

type AvatarEditorProps = {
  height: number
  onCrop: (croppedArea: Area) => void
  onCancel: () => void
  onZoomChange: () => void
  url: string
}

export const AvatarEditor = (props: AvatarEditorProps) => {
  const [crop, setCrop] = useState({ x: 1, y: 1 })
  const [zoom, setZoom] = useState(1)

  const onCropChange: CropperProps['onCropChange'] = cropLocation => {
    setCrop(cropLocation)
  }

  const onCropComplete: CropperProps['onCropComplete'] = (_, croppedAreaPixels) => {
    props.onCrop(croppedAreaPixels)
  }

  const onZoomChange = (zoom: number) => {
    setZoom(zoom)
    props.onZoomChange()
  }

  return (
    <>
      <Box position="relative" height={props.height}>
        <Cropper
          image={props.url}
          style={{
            cropAreaStyle: {
              border: 'none',
            },
          }}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropSize={{ width: 250, height: 250 }}
          cropShape="round"
          objectFit="cover"
          showGrid={false}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 24,
            right: 24,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            backgroundColor: 'text.disabled',
            cursor: 'pointer',
          }}
          onClick={props.onCancel}
        >
          <Icon name="close" size={14} />
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" pt={4} pb={4}>
        <Typography variant="body2" color="text.secondary">
          Adjust visible avatar area
        </Typography>
        <Box display="flex" width="75%" alignItems="center" gap={3}>
          <Icon name="picture-in-picture" />
          <Slider value={zoom} min={1} max={3} step={0.1} onChange={(_, zoom) => onZoomChange(zoom as number)} />
          <Icon name="image" />
        </Box>
      </Box>
    </>
  )
}
