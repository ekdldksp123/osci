import instance from "../instance"

const API_PREFIX = "/users"

export const getAllUsers = async () => {
  try {
    const { data } = await instance.get(API_PREFIX)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getUserDetail = async (userId: string) => {
  try {
    const { data } = await instance.get(`${API_PREFIX}/${userId}`)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
