import { AtlaskitSelectRefType } from "@atlaskit/select/dist/types/types"
import { QueryObserverResult } from "@tanstack/react-query"
import { ForwardedRef, useCallback, useEffect, useRef, useState } from "react"

interface IUseSearch<T = any> {
  searchId: number | undefined
  searchSingle: () => Promise<QueryObserverResult<T, unknown>>
  refetch: () => Promise<QueryObserverResult<T[], unknown>>
  data: T[]
  searchKeys: string[]
}

export const useSearch = ({
  searchId,
  searchSingle,
  refetch,
  data,
  searchKeys
}: IUseSearch) => {
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

  const getFilteredData = useCallback(() => {
    const filteredArray: typeof data = []

    if (data) {
      for (const key of searchKeys) {
        const filteredByKey = data.filter((i) =>
          i[key].toLowerCase().includes(valueToFilter?.toLowerCase() ?? "")
        )
        filteredArray.push(...filteredByKey)
      }
    }

    return Array.from(new Set(filteredArray))
  }, [valueToFilter, data])

  return {
    inputRef,
    searchHandler,
    getFilteredData
  }
}
