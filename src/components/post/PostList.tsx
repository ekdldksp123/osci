import React, { useCallback, useState } from "react"
import DynamicTable from "@atlaskit/dynamic-table"
import { Flex, Grid } from "@atlaskit/primitives"
import { AutoComplete, SectionMessage } from "../common"
import { usePostsQuery, useSinglePostQuery } from "../../queries"
import { Label } from "@atlaskit/form"
import { DatePicker } from "@atlaskit/datetime-picker"
import { useTranslation } from "react-i18next"
import { v4 as uuidv4 } from "uuid"
import { useSearch } from "../../hooks"
import { Post } from "../../types/post"

type ListItem = {
  id: number
  title: string
  createdAt: string
}

type ListItemKey = keyof ListItem

const HEADER_KEYS: ListItemKey[] = ["id", "title", "createdAt"]

const SEARCH_KEYS = ["title"]

export default () => {
  const [searchId, setSearchId] = useState<number>()

  const { t } = useTranslation("post")
  const { isLoading, isError, data, refetch } = usePostsQuery()
  const { data: searchedData, refetch: searchPost } = useSinglePostQuery({
    searchId,
    enabled: false
  })

  const { inputRef, valueToFilter, searchHandler } = useSearch({
    searchSingle: searchPost,
    refetch,
    searchId
  })

  const getFilteredPostData = useCallback(() => {
    const filteredArray: Post[] = []

    if (data) {
      for (const key of SEARCH_KEYS) {
        const filteredByKey = data.filter((i) =>
          i[key].toLowerCase().includes(valueToFilter?.toLowerCase() ?? "")
        )
        filteredArray.push(...filteredByKey)
      }
    }

    return filteredArray
  }, [valueToFilter, data])

  const headers = {
    cells: HEADER_KEYS.map((key) => ({ key, content: t(key) }))
  }

  if (isError) {
    return <SectionMessage type="error" message="Failed to load post data" />
  }

  return (
    <Grid gap="space.200" alignItems="center">
      <AutoComplete
        data={data ?? []}
        keys={["title"]}
        placeholder={t("search.placeholder")}
        onChange={setSearchId}
      />
      <Grid templateColumns="1fr 1fr" gap="space.100">
        <Flex direction="column">
          <Label id="date" htmlFor="default-date-picker-example">
            Start date
          </Label>
          <DatePicker
            id="default-date-picker-example"
            clearControlLabel="Clear date"
            shouldShowCalendarButton
            inputLabelId="date"
            openCalendarLabel="open calendar"
          />
        </Flex>
        <Flex direction="column">
          <Label id="date" htmlFor="default-date-picker-example">
            End date
          </Label>
          <DatePicker
            id="default-date-picker-example"
            clearControlLabel="Clear date"
            shouldShowCalendarButton
            inputLabelId="date"
            openCalendarLabel="open calendar"
          />
        </Flex>
      </Grid>
      <DynamicTable
        caption=""
        head={headers}
        rows={data?.map(({ id, title, createdAt }) => ({
          key: uuidv4(),
          cells: [
            { key: id, content: id },
            { key: title, content: title },
            { key: createdAt, content: createdAt }
          ]
        }))}
        rowsPerPage={5}
        defaultPage={1}
        isFixedSize
        defaultSortKey="term"
        defaultSortOrder="ASC"
        onSort={() => console.log("onSort")}
        onSetPage={() => console.log("onSetPage")}
        isLoading={isLoading}
      />
    </Grid>
  )
}
