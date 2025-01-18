import React, { Fragment, useMemo, useState } from "react"
import Comment, {
  CommentAction,
  CommentAuthor,
  CommentTime
} from "@atlaskit/comment"
import { CommentType } from "~/types/post"
import Avatar from "@atlaskit/avatar"
import { useTranslation } from "react-i18next"
import { v4 as uuidv4 } from "uuid"
import { Grid } from "@atlaskit/primitives"
import Form, { ErrorMessage, Field } from "@atlaskit/form"
import TextArea from "@atlaskit/textarea"

interface CommentListProps {
  comments: CommentType[]
}

type CommentFormType = {
  content: string
}

export default ({ comments }: CommentListProps) => {
  const { t } = useTranslation("post")
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  const actions = useMemo(
    () =>
      isEditMode
        ? [
            <CommentAction
              appearance="primary"
              onClick={() => setIsEditMode(true)}
            >
              {t("confirm")}
            </CommentAction>,
            <CommentAction onClick={() => setIsEditMode(false)}>
              {t("cancel")}
            </CommentAction>
          ]
        : [
            <CommentAction onClick={() => setIsEditMode(true)}>
              {t("update")}
            </CommentAction>,
            <CommentAction>{t("delete")}</CommentAction>
          ],
    [isEditMode]
  )

  return (
    <Grid>
      {comments.map(({ userId, createdAt, content }) => (
        <Comment
          key={uuidv4()}
          avatar={<Avatar name={`${userId}`} />}
          author={<CommentAuthor>{userId}</CommentAuthor>}
          time={<CommentTime>{createdAt}</CommentTime>}
          content={
            isEditMode ? (
              <Form<CommentFormType> onSubmit={(data) => console.log(data)}>
                {({ formProps, submitting }) => (
                  <form {...formProps}>
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
              </Form>
            ) : (
              <p>{content}</p>
            )
          }
          actions={actions}
        />
      ))}
    </Grid>
  )
}
