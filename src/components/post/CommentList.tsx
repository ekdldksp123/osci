import React from "react"
import Comment, {
  CommentAction,
  CommentAuthor,
  CommentTime
} from "@atlaskit/comment"
import { CommentType } from "~/types/post"
import Avatar from "@atlaskit/avatar"
import { useTranslation } from "react-i18next"
import { v4 as uuidv4 } from "uuid"

export default (comments: CommentType[]) => {
  const { t } = useTranslation("post")
  return (
    <>
      {comments.map(({ userId, createdAt, content }) => (
        <Comment
          key={uuidv4()}
          avatar={<Avatar name={`${userId}`} />}
          author={<CommentAuthor>{userId}</CommentAuthor>}
          time={<CommentTime>{createdAt}</CommentTime>}
          content={<p>{content}</p>}
          actions={[
            <CommentAction>{t("update")}</CommentAction>,
            <CommentAction>{t("delete")}</CommentAction>
          ]}
        ></Comment>
      ))}
    </>
  )
}
