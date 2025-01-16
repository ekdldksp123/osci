import React, { FC } from "react"
import { Grid } from "@atlaskit/primitives"
import { UserList } from "../../../src/components"

const Users: FC = () => {
  return (
    <Grid>
      <UserList />
    </Grid>
  )
}

export default Users
