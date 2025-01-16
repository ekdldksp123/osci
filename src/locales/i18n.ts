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

const initialLanguage = localStorage.getItem("language") || "ko-KR"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: initialLanguage,
    resources,
    fallbackLng: {
      "en-US": ["en-US"], // default 불러오는 것이 실패했을 경우
      default: [initialLanguage]
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
