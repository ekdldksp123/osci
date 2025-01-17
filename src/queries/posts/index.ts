import { useQuery } from "@tanstack/react-query"
import { getAllPosts, getSinglePostWithComments } from "../../api"
import { Post } from "../../types/post"

export const usePostsQuery = () => {
  const { isLoading, isError, data, refetch } = useQuery<Post[]>({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts
  })
  return { isLoading, isError, data, refetch }
}

interface IPostUserQuery {
  searchId: number | undefined
  enabled: boolean
}

export const useSinglePostQuery = ({ searchId, enabled }: IPostUserQuery) => {
  const { isLoading, isError, data, refetch } = useQuery<Post>({
    queryKey: ["getSinglePostWithComments", searchId],
    queryFn: () =>
      searchId !== undefined ? getSinglePostWithComments(searchId) : null,
    enabled
  })

  return { isLoading, isError, data, refetch }
}
