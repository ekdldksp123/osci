import React, { Dispatch, KeyboardEvent, SetStateAction, useState } from "react"

import Select, { type OptionsType, type OptionType } from "@atlaskit/select"

interface AutoCompleteProps<T = any, K = keyof T> {
  placeholder: string
  data: T[]
  keys: K[]
  onChange: Dispatch<SetStateAction<number | undefined>>
}

export default ({ placeholder, data, keys, onChange }: AutoCompleteProps) => {
  const [value, setValue] = useState<OptionType>()

  const filterData = (inputValue: string) => {
    const filteredArray: any[] = []

    if (inputValue !== "") {
      for (const key of keys) {
        const filteredByKey = data.filter((i) =>
          i[key].toLowerCase().includes(inputValue.toLowerCase())
        )
        filteredArray.push(...filteredByKey)
      }
    }
    return filteredArray.map((v) => ({ label: v[keys[0]], value: v.id }))
  }

  const promiseOptions = (inputValue: string) =>
    new Promise<OptionsType>((resolve) => {
      setTimeout(() => {
        resolve(filterData(inputValue))
      }, 250)
    })

  const onChangeHandler = (e: OptionType) => {
    onChange(e?.value as unknown as number | undefined)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !(e.target as HTMLInputElement).value) {
      onChange(undefined)
      setValue(undefined)
    }
  }

  return (
    <Select
      inputId="auto-complete"
      placeholder={placeholder}
      cacheOptions
      defaultOptions
      isSearchable
      loadOptions={promiseOptions}
      value={value}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
    />
  )
}
