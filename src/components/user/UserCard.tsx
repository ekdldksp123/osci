import React from "react"

import Avatar, { AvatarItem } from "@atlaskit/avatar"
import { Box } from "@atlaskit/primitives"
import { token } from "@atlaskit/tokens"

interface UserCardProps {
  id: string
  name: string
  email?: string
}

export default ({ id, name, email }: UserCardProps) => {
  return (
    <Box style={{ cursor: "pointer" }}>
      <AvatarItem
        avatar={<Avatar name={name} presence="online" />}
        primaryText={name}
        //   onClick={}
      />
    </Box>
  )
}
