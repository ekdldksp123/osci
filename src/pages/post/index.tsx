import React, { FC } from "react"
import { useParams } from "react-router-dom"

const Post: FC = () => {
  const { postId } = useParams()
  return <h1>{postId}</h1>
}

export default Post
