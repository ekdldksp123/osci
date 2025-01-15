import { token } from "@atlaskit/tokens"
import { Box } from "@atlaskit/primitives/compiled"
import { ButtonItem, MenuGroup, Section } from "@atlaskit/menu"
import React from "react"
import { Link } from "react-router-dom"

export default () => {
  return (
    <Box
      style={{
        color: token("color.text"),
        height: "100%",
        width: "15rem",
        borderRight: "0.5px solid"
      }}
    >
      <MenuGroup>
        <Section>
          <Link to="/">
            <ButtonItem>Users</ButtonItem>
          </Link>
        </Section>
        <Section hasSeparator>
          <Link to="/posts">
            <ButtonItem>Posts</ButtonItem>
          </Link>
        </Section>
        <Section hasSeparator>
          <Link to="/todos">
            <ButtonItem>Todos</ButtonItem>
          </Link>
        </Section>
      </MenuGroup>
    </Box>
  )
}
