import React from "react"
import DynamicTable from "@atlaskit/dynamic-table"
import { Todo } from "../../types/todo"
import { useTodosQuery } from "../../queries/todos"
import { SectionMessage } from "../common"
import { v4 as uuidv4 } from "uuid"
import { Text } from "@atlaskit/primitives"
import CheckboxCheckedIcon from "@atlaskit/icon/core/checkbox-checked"
import CheckboxUncheckedIcon from "@atlaskit/icon/core/checkbox-unchecked"
import { useTranslation } from "react-i18next"
import Page from "@atlaskit/page"

type ListItemKey = keyof Todo

const HEADER_KEYS: ListItemKey[] = ["id", "userId", "title", "completed"]

export default () => {
  const { t } = useTranslation("todo")
  const { isLoading, isError, data } = useTodosQuery()
  const headers = {
    cells: HEADER_KEYS.map((key) => ({ key, content: t(key) }))
  }

  if (isError) {
    return <SectionMessage type="error" message="Failed to load todo data" />
  }
  return (
    <Page>
      <DynamicTable
        head={headers}
        rows={data?.map(({ id, userId, title, completed }) => ({
          key: uuidv4(),
          cells: [
            { key: id, content: id },
            { key: userId, content: userId },
            { key: title, content: <Text weight="semibold">{title}</Text> },
            {
              key: completed,
              content:
                completed === true ? (
                  <CheckboxCheckedIcon label="" />
                ) : (
                  <CheckboxUncheckedIcon label="" />
                )
            }
          ]
        }))}
        rowsPerPage={20}
        defaultPage={1}
        isLoading={isLoading}
      />
    </Page>
  )
}
