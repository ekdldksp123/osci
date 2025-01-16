import React from "react"

import Avatar, { AvatarItem } from "@atlaskit/avatar"
import { ButtonItem } from "@atlaskit/menu"
import UserModal from "./UserModal"
import { HeadlessToggle } from "../common"
import { useSingleUserQuery } from "../../queries"

interface UserCardProps {
  id: number
  name: string
}

export default ({ id, name }: UserCardProps) => {
  const { data, refetch } = useSingleUserQuery({ searchId: id, enabled: false })

  return (
    <HeadlessToggle>
      {(isOpen, toggle) => {
        const onClickHandler = () => {
          refetch().then(() => toggle())
        }
        return (
          <>
            <ButtonItem>
              <AvatarItem
                avatar={<Avatar name={name} presence="online" />}
                primaryText={name}
                onClick={onClickHandler}
              />
            </ButtonItem>
            {isOpen && data && <UserModal user={data} onClose={toggle} />}
          </>
        )
      }}
    </HeadlessToggle>
  )
}
