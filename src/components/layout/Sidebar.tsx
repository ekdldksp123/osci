import { token } from "@atlaskit/tokens"
import { Box } from "@atlaskit/primitives/compiled"
import { ButtonItem, MenuGroup, Section } from "@atlaskit/menu"
import React from "react"
import { Link } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { useTranslation } from "react-i18next"
import { MenuItem } from "~/types"

export const MENU_LIST: MenuItem[] = [
  { localKey: "users", href: "/" },
  { localKey: "posts", href: "/posts" },
  { localKey: "todos", href: "/todo" }
]

export default () => {
  const { t } = useTranslation("common")
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
        {MENU_LIST.map(({ href, localKey }, idx) => (
          <Section key={uuidv4()} hasSeparator={idx !== 0}>
            <Link to={href}>
              <ButtonItem>{t(localKey)}</ButtonItem>
            </Link>
          </Section>
        ))}
      </MenuGroup>
    </Box>
  )
}
