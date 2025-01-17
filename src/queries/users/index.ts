import { useQuery } from "@tanstack/react-query"
import { getAllUsers, getUserDetail } from "../../api"
import { User } from "../../types/user"

export const useUsersQuery = () => {
  const { isLoading, isError, data, refetch } = useQuery<User[]>({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers
  })
  return { isLoading, isError, data, refetch }
}

interface ISingleUserQuery {
  searchId: number | undefined
  enabled: boolean
}

export const useSingleUserQuery = ({ searchId, enabled }: ISingleUserQuery) => {
  const { isLoading, isError, data, refetch } = useQuery<User>({
    queryKey: ["getUserDetail", searchId],
    queryFn: () => (searchId !== undefined ? getUserDetail(searchId) : null),
    enabled
  })

  return { isLoading, isError, data, refetch }
}
