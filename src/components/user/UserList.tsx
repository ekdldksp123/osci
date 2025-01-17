import React, { useState } from "react"
import { Grid } from "@atlaskit/primitives"
import { v4 as uuidv4 } from "uuid"
import { AutoComplete, SectionMessage } from "../../components"
import UserSkeleton from "./UserSkeleton"
import UserCard from "./UserCard"

import { useSingleUserQuery, useUsersQuery } from "../../queries"
import { useTranslation } from "react-i18next"
import { useSearch } from "../../hooks"

const searchKeys = ["name", "email"]

export default () => {
  const { t } = useTranslation("user")

  const [searchId, setSearchId] = useState<number>()
  const { isLoading, isError, data, refetch } = useUsersQuery()
  const { data: searchedData, refetch: searchUser } = useSingleUserQuery({
    searchId,
    enabled: false
  })

  const { inputRef, searchHandler, getFilteredData } = useSearch({
    searchSingle: searchUser,
    refetch,
    searchId,
    data: data ?? [],
    searchKeys
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

  if (searchedData) {
    return (
      <Grid>
        <AutoComplete
          ref={inputRef}
          data={getFilteredData()}
          keys={searchKeys}
          onChange={setSearchId}
          placeholder={t("search.placeholder")}
          onSearch={searchHandler}
        />
        <UserCard key={uuidv4()} {...searchedData} />
      </Grid>
    )
  }

  return (
    <Grid>
      <AutoComplete
        ref={inputRef}
        data={getFilteredData()}
        keys={searchKeys}
        onChange={setSearchId}
        placeholder={t("search.placeholder")}
        onSearch={searchHandler}
      />
      {getFilteredData().map((user) => (
        <UserCard key={uuidv4()} {...user} />
      ))}
    </Grid>
  )
}
