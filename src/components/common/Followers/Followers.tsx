import { Avatar, AvatarGroup, Stack, Typography } from '@mui/material'

type FollowersProps = {
  users: {
    name: string;
    image: string;
  }[];
}

export const Followers = (props: FollowersProps) => {
  const { users } = props

  // If there are no users, don't render anything
  if (!users?.length) return null

  // Slice the first 3 users to show as avatars
  const avatars = users.slice(0, 3)

  // Prepare the string of up to the first 2 follower names
  const firstTwo = users.slice(0, 2)
  const followedBy = firstTwo.map((user) => user.name).join(', ')

  // Determine if there are more than 2 followers
  const hasMore = users.length > 2

  // Calculate how many additional followers beyond the first two
  const more = users.length - 2

  return (
    <Stack direction="row" alignItems="center" spacing={8}>
      <AvatarGroup max={3}>
        {avatars.map(({ name, image }, i) => (
          <Avatar
            sx={{ width: 32, height: 32 }}
            key={name || i}
            alt={name}
            src={image}
          >
            {name?.charAt(0)}
          </Avatar>
        ))}
      </AvatarGroup>
      <Stack
        direction="row"
        alignItems="center"
        spacing={3}
        component={Typography}
        variant="p4"
      >
        <Typography variant="p4" component="span" color="black.500">
          Followed by
        </Typography>
        <Typography variant="p4" component="span" color="black.900">
          {followedBy}
        </Typography>
        {hasMore && (
          <>
            <Typography variant="p4" component="span" color="black.500">
              and
            </Typography>
            <Typography variant="p4" component="span" color="black.900">
              {more}
            </Typography>
            <Typography variant="p4" component="span" color="black.900">
              others
            </Typography>
          </>
        )}
      </Stack>
    </Stack>
  )
}
