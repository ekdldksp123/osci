import React from "react"

import Avatar, { AvatarItem } from "@atlaskit/avatar"
import { ButtonItem } from "@atlaskit/menu"

interface UserCardProps {
  id: string
  name: string
  email?: string
}

export default ({ id, name, email }: UserCardProps) => {
  return (
    <ButtonItem>
      <AvatarItem
        avatar={<Avatar name={name} presence="online" />}
        primaryText={name}
        //   onClick={}
      />
    </ButtonItem>
  )
}
