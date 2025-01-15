import { token } from "@atlaskit/tokens"
import { Box } from "@atlaskit/primitives/compiled"
import React from "react"
import Select, { type OptionsType } from "@atlaskit/select"
import { useTranslation } from "react-i18next"

const LNG_OPTS: OptionsType[] = [
  { label: "한국어" as const, value: "ko-KR" },
  { label: "ENG" as const, value: "en-US" }
]

export default () => {
  const { i18n, t } = useTranslation("common")

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: token("space.100"),
        color: token("color.text"),
        font: token("font.heading.xlarge"),
        borderBottom: "0.5px solid"
      }}
    >
      {/* 오픈소스컨설팅 FE 과제 */}
      {t("app-title")}
      <Select
        inputId="async-select-example"
        cacheOptions
        defaultOptions
        defaultValue={LNG_OPTS[0]}
        options={LNG_OPTS}
      />
    </Box>
  )
}
