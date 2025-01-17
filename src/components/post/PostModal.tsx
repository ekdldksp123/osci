import React from "react"

import Button, { IconButton } from "@atlaskit/button/new"
import CrossIcon from "@atlaskit/icon/glyph/cross"
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle
} from "@atlaskit/modal-dialog"
import { Flex, Grid, Text } from "@atlaskit/primitives"
import {
  gridStyles,
  closeContainerStyles,
  titleContainerStyles
} from "../../styles"

import Avatar from "@atlaskit/avatar"
import { useTranslation } from "react-i18next"
import { CommentType, Post } from "../../types/post"
import CommentList from "./CommentList"

// const CommentList = lazy(() => import("./CommentList"))

interface PostModalProps {
  post: Post
  comments: CommentType[]
  onClose: () => void
}

export default ({
  post: { id, title, content },
  comments,
  onClose
}: PostModalProps) => {
  const { t } = useTranslation("post")

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <Grid gap="space.200" templateAreas={["title close"]} xcss={gridStyles}>
          <Flex xcss={closeContainerStyles} justifyContent="end">
            <IconButton
              appearance="subtle"
              icon={CrossIcon}
              label="Close Modal"
              onClick={onClose}
            />
          </Flex>
          <Flex xcss={titleContainerStyles} justifyContent="start">
            <ModalTitle>
              <Flex alignItems="center" gap="space.100">
                <Avatar />
                {title}
              </Flex>
            </ModalTitle>
          </Flex>
        </Grid>
      </ModalHeader>
      <ModalBody>
        <Text weight="regular">{content}</Text>
        {/* <Suspense fallback={<div>...Loading</div>}> */}
        <CommentList {...comments} />
        {/* </Suspense> */}
        {/* <Form<PostFormType> onSubmit={(data) => console.log(data)}>
          {({ formProps, submitting }) => (
            <form {...formProps}>
              <Field
                name="title"
                label={t("title")}
                defaultValue={title}
                isRequired
              >
                {({ fieldProps, error }) => (
                  <Fragment>
                    <TextField autoComplete="off" {...fieldProps} />
                  </Fragment>
                )}
              </Field>
              <Field
                name="content"
                label={t("content")}
                defaultValue={content}
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
        </Form> */}
      </ModalBody>
      <ModalFooter>
        <Button appearance="primary" onClick={onClose}>
          {t("update")}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
