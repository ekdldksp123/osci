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

export const getSinglePostWithComments = async (postId: string) => {
  try {
    const { data } = await instance.get(`${API_PREFIX}/${postId}`)
    const { data: commentData } = await instance.get(`/comments/post/${postId}`)

    return {
      ...data,
      comments: commentData
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
