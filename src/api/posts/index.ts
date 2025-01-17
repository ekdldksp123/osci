import { CommentType, Post } from "../../types/post"
import instance from "../instance"

const API_PREFIX = "/posts"

export const getAllPosts = async () => {
  try {
    const { data } = await instance.get(API_PREFIX)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getSinglePost = async (postId: number): Promise<Post> => {
  try {
    const { data } = await instance.get(`${API_PREFIX}/${postId}`)

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getCommentsOfSinglePost = async (
  postId: number
): Promise<CommentType[]> => {
  try {
    const { data } = await instance.get(`/comments/post/${postId}`)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
