import React, { Suspense, lazy, useMemo } from "react"

import Heading from "@atlaskit/heading"
import { Flex, Grid, Stack } from "@atlaskit/primitives"
import { useCommentsOfPostQuery, useSinglePostQuery } from "../../queries"
import Spinner from "@atlaskit/spinner"
import { CommentType, Post } from "../../types/post"
import CommentList from "./CommentList"
import Page, { GridColumn } from "@atlaskit/page"
import { ButtonGroup } from "@atlaskit/button"
import { useTranslation } from "react-i18next"
import Button from "@atlaskit/button"

// const CommentList = lazy(() => import("./CommentList"))

interface PostDetailProps {
  postId: string
}

export default ({ postId }: PostDetailProps) => {
  const searchId = Number(postId)

  const { data, isLoading } = useSinglePostQuery({
    searchId,
    enabled: true
  })

  const { data: cData } = useCommentsOfPostQuery({
    searchId,
    enabled: true
  })

  const post = data as Post | undefined
  const comments = cData as CommentType[]

  const { t } = useTranslation("post")

  if (isLoading) {
    return (
      <Grid justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </Grid>
    )
  }

  return (
    <Page>
      <Flex gap="space.300">
        <Heading size="medium" as="h1">
          {post?.title}
        </Heading>
        <span>{post?.createdAt}</span>
      </Flex>

      <p>{post?.content}</p>

      <GridColumn>
        <ButtonGroup>
          <Button>{t("update")}</Button>
          <Button>{t("delete")}</Button>
        </ButtonGroup>
      </GridColumn>
      {comments && (
        // <Suspense fallback={<Spinner size="large" />}>
        <CommentList comments={comments} />
        // </Suspense>
      )}
    </Page>
  )
}
