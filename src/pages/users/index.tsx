import React, { FC } from "react"
import { useQuery } from "@tanstack/react-query"
import { Grid } from "@atlaskit/primitives"
import { v4 as uuidv4 } from "uuid"
import { getAllUsers } from "../../../src/api"
import { SectionMessage, UserCard, UserSkeleton } from "../../../src/components"

const Users: FC = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["userList"],
    queryFn: getAllUsers
  })

  if (isLoading) {
    return (
      <Grid>
        {Array.from({ length: 10 }).map((_) => (
          <UserSkeleton key={uuidv4()} />
        ))}
      </Grid>
    )
  }

  if (isError) {
    return <SectionMessage type="error" message="Failed to load user data" />
  }

  return (
    <Grid>
      <h1>Users</h1>
      {data.map((user) => (
        <UserCard key={uuidv4()} id={user.id} name={user.name} />
      ))}
    </Grid>
  )
}

export default Users
