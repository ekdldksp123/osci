import i18n, { Resource } from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import * as en from "./en"

import * as ko from "./ko"

const resources: Resource = {
  "en-US": {
    ...en
  },
  "ko-KR": {
    ...ko
  }
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // fallbackLng: ["ko-KR"], // 초기 설정 언어
    fallbackLng: {
      "en-US": ["en-US"], // default 불러오는 것이 실패했을 경우
      default: ["ko-KR"]
    },
    debug: true,
    keySeparator: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  })

export default i18n
