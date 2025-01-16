import { token } from "@atlaskit/tokens"
import { Box } from "@atlaskit/primitives/compiled"
import React from "react"
import Select, { type OptionType } from "@atlaskit/select"
import { useTranslation } from "react-i18next"
import { SupportedLanguage } from "~/types"

const LNG_OPTS: OptionType[] = [
  { label: "한국어", value: "ko-KR" },
  { label: "ENG", value: "en-US" }
]

export default () => {
  const { i18n, t } = useTranslation("common")

  const handleChangeLanguage = async (lng: string | number | undefined) => {
    const language = lng as unknown as SupportedLanguage
    i18n
      .changeLanguage(language)
      .then(() => localStorage.setItem("language", language))
  }

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
