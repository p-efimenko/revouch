import { useMutation } from '@tanstack/react-query'
import { useToast, useUpdateSession } from '@/hooks/custom'
import { uploadAvatar } from '@/api/user'
import { getUploadLink } from '@/api/storage'

import type { GetUploadLinkMimetype } from '@/api/models'


export function useUploadUserAvatar() {

  const { updateSession } = useUpdateSession()

  const toast = useToast()

  const mutation = useMutation({
    mutationFn: async (file: File) => {

      let uploadUrl
      let location

      // step 1: get upload link
      try {
        const response = await getUploadLink({ mimetype: file.type as GetUploadLinkMimetype })

        uploadUrl = response.data.signedUrl
        location = response.data.location

      }
      catch {
        throw new Error('Failed to get upload link')
      }

      // step 2: upload file to storage
      try {
        await fetch(uploadUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
          },
          body: file,
        })
      }
      catch {
        throw new Error('Failed to upload file')
      }
      

      // step 3: attach file to user
      try {
        await uploadAvatar({ location })
      }
      catch {
        throw new Error('Failed to attach file to user')
      }

      await updateSession()
    
    },
    onSuccess: () => {
      toast.success('Avatar uploaded successfully')
    },
    onError: (e) => {
      const error = e as Error
      toast.error('Something went wrong. Please try again later.')
      console.error(error)
    },
  })

  return mutation
}