import { useQuery } from "@tanstack/react-query"
import { Grid } from "@atlaskit/primitives"
import { v4 as uuidv4 } from "uuid"
import { getAllUsers, getUserDetail } from "../../../src/api"
import { AutoComplete, SectionMessage } from "../../../src/components"
import UserSkeleton from "./UserSkeleton"
import UserCard from "./UserCard"

import React, { useEffect, useState } from "react"
import { User } from "~/types/user"

export default () => {
  const [searchId, setSearchId] = useState<number>()

  const { isLoading, isError, data, refetch } = useQuery<User[]>({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers
  })

  const { data: searchedData, refetch: searchUser } = useQuery({
    queryKey: ["getUserDetail", searchId],
    queryFn: () => (searchId !== undefined ? getUserDetail(searchId) : null),
    enabled: false
  })

  useEffect(() => {
    if (searchId !== undefined) {
      searchUser()
    } else {
      refetch()
    }
  }, [searchId])

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

  if (searchedData) {
    return (
      <Grid>
        <AutoComplete
          data={data}
          keys={["name", "email"]}
          onChange={setSearchId}
        />
        <UserCard
          key={uuidv4()}
          id={searchedData.id}
          name={searchedData.name}
        />
      </Grid>
    )
  }

  return (
    <Grid>
      <AutoComplete
        data={data}
        keys={["name", "email"]}
        onChange={setSearchId}
      />
      {data.map((user) => (
        <UserCard key={uuidv4()} id={user.id} name={user.name} />
      ))}
    </Grid>
  )
}
