import { useQuery } from "@tanstack/react-query"
import { getAllPosts, getCommentsOfSinglePost, getSinglePost } from "../../api"
import { CommentType, Post } from "../../types/post"

export const usePostsQuery = () => {
  const { isLoading, isError, data, refetch } = useQuery<Post[]>({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts
  })
  return { isLoading, isError, data, refetch }
}

interface ISinglePostQuery {
  searchId: number | undefined
  enabled: boolean
}

export const useSinglePostQuery = ({ searchId, enabled }: ISinglePostQuery) => {
  const { isLoading, isError, data, refetch } = useQuery<Post>({
    queryKey: ["getSinglePost", searchId],
    queryFn: () => (searchId !== undefined ? getSinglePost(searchId) : null),
    enabled
  })

  return { isLoading, isError, data, refetch }
}

export const useCommentsOfPostQuery = ({
  searchId,
  enabled
}: ISinglePostQuery) => {
  const { isLoading, isError, data, refetch } = useQuery<CommentType[]>({
    queryKey: ["getCommentsOfSinglePost", searchId],
    queryFn: () =>
      searchId !== undefined ? getCommentsOfSinglePost(searchId) : null,
    enabled
  })

  return { isLoading, isError, data, refetch }
}
