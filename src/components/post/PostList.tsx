import React, { useCallback, useState } from "react"
import DynamicTable from "@atlaskit/dynamic-table"
import { Grid } from "@atlaskit/primitives"
import { AutoComplete, SectionMessage } from "../common"
import { usePostsQuery, useSinglePostQuery } from "../../queries"
import { useTranslation } from "react-i18next"
import { v4 as uuidv4 } from "uuid"
import { useSearch } from "../../hooks"
import PostFilter from "./PostFilter"
import { Link } from "react-router-dom"

type ListItem = {
  id: number
  title: string
  createdAt: string
}

type ListItemKey = keyof ListItem

const HEADER_KEYS: ListItemKey[] = ["id", "title", "createdAt"]

const searchKeys = ["title"]

export default () => {
  const [searchId, setSearchId] = useState<number>()
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()

  const { t } = useTranslation("post")
  const { isLoading, isError, data, refetch } = usePostsQuery()
  const { refetch: searchPost } = useSinglePostQuery({
    searchId,
    enabled: false
  })

  const { inputRef, searchHandler, getFilteredData } = useSearch({
    searchSingle: searchPost,
    refetch,
    searchId,
    data: data ?? [],
    searchKeys
  })

  const headers = {
    cells: HEADER_KEYS.map((key) => ({ key, content: t(key) }))
  }

  const getFilteredPostData = useCallback(() => {
    const posts = getFilteredData()
    if (!startDate || !endDate) {
      return posts
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    return posts.filter(({ createdAt }) => {
      const createdAtDate = new Date(createdAt)
      return createdAtDate >= start && createdAtDate <= end
    })
  }, [startDate, endDate, getFilteredData])

  if (isError) {
    return <SectionMessage type="error" message="Failed to load post data" />
  }

  return (
    <Grid gap="space.200" alignItems="center">
      <AutoComplete
        ref={inputRef}
        data={getFilteredPostData()}
        keys={searchKeys}
        onChange={setSearchId}
        placeholder={t("search.placeholder")}
        onSearch={searchHandler}
      />
      <PostFilter setStartDate={setStartDate} setEndDate={setEndDate} />
      <DynamicTable
        caption=""
        head={headers}
        rows={getFilteredPostData().map(({ id, title, createdAt }) => ({
          key: uuidv4(),
          cells: [
            { key: id, content: id },
            { key: title, content: <Link to={`/post/${id}`}>{title}</Link> },
            { key: createdAt, content: createdAt }
          ]
        }))}
        rowsPerPage={5}
        defaultPage={1}
        isLoading={isLoading}
      />
    </Grid>
  )
}
