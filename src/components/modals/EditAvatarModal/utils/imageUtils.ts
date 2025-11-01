import type { Area } from 'react-easy-crop'

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
const getCroppedImage = async (
  imageSrc: string,
  pixelCrop: { width: number; height: number; x: number; y: number },
): Promise<string | null> => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  // set canvas size to match the bounding box
  canvas.width = image.width
  canvas.height = image.height

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(image.width / 2, image.height / 2)
  ctx.translate(-image.width / 2, -image.height / 2)
  ctx.drawImage(image, 0, 0)

  const croppedCanvas = document.createElement('canvas')

  const croppedCtx = croppedCanvas.getContext('2d')

  if (!croppedCtx) {
    return null
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width
  croppedCanvas.height = pixelCrop.height

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  )

  return new Promise(resolve => {
    croppedCanvas.toBlob(file => {
      if (file) {
        resolve(URL.createObjectURL(file))
      }
    }, 'image/jpeg')
  })
}

const getFilenameFromUrl = (url: string) => {
  const urlObject = new URL(url)
  const pathname = urlObject.pathname

  return pathname.split('/').pop() || ''
}

const createFileFromBlobUrl = async (blobUrl: string, url: string) => {
  const fileName = getFilenameFromUrl(url)
  const response = await fetch(blobUrl)
  const blob = await response.blob()

  return new File([blob], fileName, { type: blob.type })
}

export const getFileFromCroppedImage = async (url: string, croppedPixels: Area) => {
  const croppedImage = await getCroppedImage(url, croppedPixels)

  return await createFileFromBlobUrl(croppedImage || '', url)
}
