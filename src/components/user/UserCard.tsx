import React from "react"

import Avatar, { AvatarItem } from "@atlaskit/avatar"
import { ButtonItem } from "@atlaskit/menu"
import UserModal from "./UserModal"
import { HeadlessToggle } from "../common"
import { useSingleUserQuery } from "../../queries"
import { User } from "../../types/user"

export default (user: User) => {
  const { id, name, email } = user
  const { data, refetch } = useSingleUserQuery({ searchId: id, enabled: false })

  return (
    <HeadlessToggle>
      {(isOpen, toggle) => {
        const onClickHandler = () => {
          refetch()
          toggle()
        }
        return (
          <>
            <ButtonItem>
              <AvatarItem
                avatar={<Avatar name={name} presence="online" />}
                primaryText={name}
                secondaryText={email}
                onClick={onClickHandler}
              />
            </ButtonItem>
            {isOpen && data && (
              <UserModal user={data as unknown as User} onClose={toggle} />
            )}
          </>
        )
      }}
    </HeadlessToggle>
  )
}
