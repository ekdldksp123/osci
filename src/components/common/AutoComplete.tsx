import React from "react"

import Select, { type OptionsType } from "@atlaskit/select"

interface AutoCompleteProps<T = any, K = keyof T> {
  data: T[]
  keys: K[]
}

export default ({ data, keys }: AutoCompleteProps) => {
  const filterData = (inputValue: string) => {
    const filteredArray: any[] = []

    console.log({ inputValue })
    if (inputValue !== "") {
      for (const key of keys) {
        const filteredByKey = data.filter((i) =>
          i[key].toLowerCase().includes(inputValue.toLowerCase())
        )
        filteredArray.push(...filteredByKey)
      }
    }
    console.log({ filteredArray })
    return filteredArray.map((v) => ({ label: v[keys[0]], value: v }))
  }

  const promiseOptions = (inputValue: string) =>
    new Promise<OptionsType>((resolve) => {
      setTimeout(() => {
        resolve(filterData(inputValue))
      }, 1000)
    })
  return (
    <Select
      inputId="auto-complete"
      placeholder="Search"
      cacheOptions
      defaultOptions
      isSearchable
      loadOptions={promiseOptions}
    />
  )
}
