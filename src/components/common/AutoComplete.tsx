import React, {
  Dispatch,
  forwardRef,
  KeyboardEvent,
  // MutableRefObject,
  SetStateAction,
  useState
} from "react"

import Select, { type OptionsType, type OptionType } from "@atlaskit/select"
import { AtlaskitSelectRefType } from "@atlaskit/select/dist/types/types"

interface AutoCompleteProps<T = any, K = keyof T> {
  // ref: MutableRefObject<null>
  placeholder: string
  data: T[]
  keys: K[]
  onChange: Dispatch<SetStateAction<number | undefined>>
  onSearch: () => void
}
export default forwardRef<AtlaskitSelectRefType, AutoCompleteProps>(
  (
    {
      // ref,
      placeholder,
      data,
      keys,
      onChange,
      onSearch
    },
    ref
  ) => {
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
      // onSearch()
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        if (!(e.target as HTMLInputElement).value) {
          onChange(undefined)
          setValue(undefined)
        }
        onSearch()
      }
    }

    return (
      <Select
        ref={ref}
        inputId="auto-complete"
        placeholder={placeholder}
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        value={value}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
    )
  }
)
