import React, { Fragment, useState } from "react"

import Heading from "@atlaskit/heading"
import { Flex, Grid } from "@atlaskit/primitives"
import { useCommentsOfPostQuery, useSinglePostQuery } from "../../queries"
import Spinner from "@atlaskit/spinner"
import { CommentType, Post } from "../../types/post"
import CommentList from "./CommentList"
import Page, { GridColumn } from "@atlaskit/page"
import { ButtonGroup } from "@atlaskit/button"
import { useTranslation } from "react-i18next"
import Button from "@atlaskit/button"
import TextField from "@atlaskit/textfield"
import Form, { ErrorMessage, Field } from "@atlaskit/form"
import TextArea from "@atlaskit/textarea"

interface PostDetailProps {
  postId: string
}

type PostFormType = {
  title: string
  content: string
}

export default ({ postId }: PostDetailProps) => {
  const searchId = Number(postId)

  const [isEditMode, setIsEditMode] = useState<boolean>(false)

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
      <Grid gap="space.500">
        <Flex direction="column" gap="space.100">
          {isEditMode ? (
            <Form<PostFormType> onSubmit={(data) => console.log(data)}>
              {({ formProps, submitting }) => (
                <form {...formProps}>
                  <Field
                    name="title"
                    label={t("title")}
                    defaultValue={post?.title}
                    isRequired
                  >
                    {({ fieldProps, error }) => (
                      <TextField autoComplete="off" {...fieldProps} />
                    )}
                  </Field>
                  <Field
                    name="content"
                    label={t("content")}
                    defaultValue={post?.content}
                    isRequired
                  >
                    {({ fieldProps, error }) => (
                      <Fragment>
                        <TextArea {...fieldProps} />
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                      </Fragment>
                    )}
                  </Field>
                </form>
              )}
            </Form>
          ) : (
            <>
              <Flex gap="space.300">
                <Heading size="medium" as="h1">
                  {post?.title}
                </Heading>

                <span>{post?.createdAt}</span>
              </Flex>

              <p>{post?.content}</p>
            </>
          )}

          <GridColumn>
            <ButtonGroup>
              {isEditMode ? (
                <>
                  <Button
                    appearance="primary"
                    onClick={() => setIsEditMode(true)}
                  >
                    {t("confirm")}
                  </Button>
                  <Button onClick={() => setIsEditMode(false)}>
                    {t("cancel")}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    appearance="primary"
                    onClick={() => setIsEditMode(true)}
                  >
                    {t("update")}
                  </Button>
                  <Button>{t("delete")}</Button>
                </>
              )}
            </ButtonGroup>
          </GridColumn>
        </Flex>

        {comments && <CommentList comments={comments} />}
      </Grid>
    </Page>
  )
}
