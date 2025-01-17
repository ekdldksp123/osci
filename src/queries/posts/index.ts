import { useQuery } from "@tanstack/react-query"
import { getAllPosts } from "../../api"
import { Post } from "../../types/post"

export const usePostsQuery = () => {
  const { isLoading, isError, data, refetch } = useQuery<Post[]>({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts
  })
  return { isLoading, isError, data, refetch }
}
