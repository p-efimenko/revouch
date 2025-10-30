import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/utils/get-query-client'
import { getMe } from '@/api/user'
import { Bio } from './components'

export default async function BioPage() {

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['me'],
    queryFn: getMe,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Bio />
    </HydrationBoundary>
  )
}
