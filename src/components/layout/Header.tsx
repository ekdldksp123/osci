import { token } from "@atlaskit/tokens"
import { Box } from "@atlaskit/primitives/compiled"
import React, { useEffect } from "react"
import Select, { type OptionType } from "@atlaskit/select"
import { useTranslation } from "react-i18next"
import { SupportedLanguage } from "src/types"

const LNG_OPTS: OptionType[] = [
  { label: "한국어", value: "ko-KR" },
  { label: "ENG", value: "en-US" }
]

export default () => {
  const { i18n, t } = useTranslation("common")

  const handleChangeLanguage = async (language: SupportedLanguage) => {
    i18n.changeLanguage(language).then(() => console.log(i18n.language))
  }

  // useEffect(() => {}, [i18n.language])

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
        onChange={(e) => handleChangeLanguage(e?.value)}
      />
    </Box>
  )
}
