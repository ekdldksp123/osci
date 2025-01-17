import { AtlaskitSelectRefType } from "@atlaskit/select/dist/types/types"
import { QueryObserverResult } from "@tanstack/react-query"
import { ForwardedRef, useEffect, useRef, useState } from "react"

interface IUseSearch<T = any> {
  searchId: number | undefined
  searchSingle: () => Promise<QueryObserverResult<T, unknown>>
  refetch: () => Promise<QueryObserverResult<T[], unknown>>
}

export const useSearch = ({ searchId, searchSingle, refetch }: IUseSearch) => {
  const inputRef = useRef(null)
  const [isSearch, setIsSearch] = useState<boolean>(false)

  const [valueToFilter, setValueToFilter] = useState<string>()

  const searchHandler = () => setIsSearch(true)

  useEffect(() => {
    if (searchId !== undefined) {
      searchSingle()
    } else {
      // console.log({ searchId, isSearch, valueToFilter })
      if (searchId === undefined && isSearch) {
        const current = inputRef.current as ForwardedRef<AtlaskitSelectRefType>
        const inputValue = (current as unknown as AtlaskitSelectRefType)?.select
          ?.inputRef?.value
        // console.log({ inputValue })

        if (inputValue === "") {
          refetch()
          setValueToFilter("")
        } else {
          setValueToFilter(inputValue)
        }
        setTimeout(() => setIsSearch(false), 500)
      }
    }
  }, [searchId, isSearch])

  return {
    inputRef,
    valueToFilter,
    searchHandler
  }
}
