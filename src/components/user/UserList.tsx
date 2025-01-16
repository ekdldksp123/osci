import { useQuery } from "@tanstack/react-query"
import { Grid } from "@atlaskit/primitives"
import { v4 as uuidv4 } from "uuid"
import { getAllUsers } from "../../../src/api"
import { AutoComplete, SectionMessage } from "../../../src/components"
import { useTranslation } from "react-i18next"
import UserSkeleton from "./UserSkeleton"
import UserCard from "./UserCard"

import React from "react"

import Form, { Field } from "@atlaskit/form"
import SearchIcon from "@atlaskit/icon/core/search"
import Textfield from "@atlaskit/textfield"

function TextFieldElementsBeforeAndAfterExample() {
  return (
    <Form onSubmit={(formData) => console.log("form data", formData)}>
      <Field name="user-search" defaultValue="">
        {({ fieldProps }: any) => (
          <Textfield
            {...fieldProps}
            elemBeforeInput={<SearchIcon label="" />}
          />
        )}
      </Field>
    </Form>
  )
}

export default () => {
  const { isLoading, isError, data, refetch } = useQuery({
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
      <AutoComplete data={data} keys={["name", "email"]} />
      {data.map((user) => (
        <UserCard key={uuidv4()} id={user.id} name={user.name} />
      ))}
    </Grid>
  )
}
