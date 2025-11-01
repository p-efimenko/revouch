import { Stack, Skeleton, Divider } from '@mui/material'

export const SkeletonList = () => {
  return (
    <>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </>
  )
}

export const SkeletonItem = () => {
  return (
    <>
      <Stack
        py={12}
        pr={24}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="flex-start" spacing={12}>
          <Skeleton variant="circular" sx={{ width: 48, height: 48 }} />
          <Stack>
            <Skeleton variant="text" width={120} height={24} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width={180} height={18} />
          </Stack>
        </Stack>
        <Skeleton variant="rectangular" width={96} height={36} />
      </Stack>
      <Divider />
    </>
  )
}