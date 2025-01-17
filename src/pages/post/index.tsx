import React, { FC } from "react"
import { useParams } from "react-router-dom"
import { PostDetail } from "../../components/post"

const Post: FC = () => {
  const { postId } = useParams()
  return <PostDetail postId={postId} />
}

export default Post
