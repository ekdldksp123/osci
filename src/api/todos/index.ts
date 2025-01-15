import instance from "../instance"

const API_PREFIX = "/todos"

export const getAllTodos = async () => {
  try {
    const { data } = await instance.get(API_PREFIX)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
