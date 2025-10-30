'use client'

import { useState } from 'react'
import { Box } from '@mui/material'
import { Search } from '@/components/common/Search'
import { List } from '../List'
import { useDebounceValue } from '@/hooks/common/useDebounceValue'

type FriendsClientProps = {
  userId: string
}

export const FriendsClient = ({ userId }: FriendsClientProps) => {
  const [search, setSearch] = useState('')
  const debouncedValue = useDebounceValue(search, 500)

  return (
    <Box pb={20} width="100%">
      <Box pb={20} pr={24}>
        <Search value={search} onChange={setSearch} placeholder="Search friends" />
      </Box>

      <List userId={userId} search={debouncedValue} />
    </Box>
  )
}


