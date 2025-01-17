import React, { useEffect, useState } from "react"
import { Grid } from "@atlaskit/primitives"
import { v4 as uuidv4 } from "uuid"
import { AutoComplete, SectionMessage } from "../../components"
import UserSkeleton from "./UserSkeleton"
import UserCard from "./UserCard"

import { useSingleUserQuery, useUsersQuery } from "../../queries"
import { useTranslation } from "react-i18next"

export default () => {
  const { t } = useTranslation("user")

  const [searchId, setSearchId] = useState<number>()

  const { isLoading, isError, data, refetch } = useUsersQuery()
  const { data: searchedData, refetch: searchUser } = useSingleUserQuery({
    searchId,
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
          data={data ?? []}
          keys={["name", "email"]}
          onChange={setSearchId}
          placeholder={t("search.placeholder")}
        />
        <UserCard key={uuidv4()} {...searchedData} />
      </Grid>
    )
  }

  return (
    <Grid>
      <AutoComplete
        data={data ?? []}
        keys={["name", "email"]}
        onChange={setSearchId}
        placeholder={t("search.placeholder")}
      />
      {data?.map((user) => (
        <UserCard key={uuidv4()} {...user} />
      ))}
    </Grid>
  )
}
