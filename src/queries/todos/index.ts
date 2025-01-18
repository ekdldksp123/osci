import { useQuery } from "@tanstack/react-query"
import { Todo } from "../../types/todo"
import { getAllTodos } from "../../api"

export const useTodosQuery = () => {
  const { isLoading, isError, data, refetch } = useQuery<Todo[]>({
    queryKey: ["getAllPosts"],
    queryFn: getAllTodos
  })
  return { isLoading, isError, data, refetch }
}
