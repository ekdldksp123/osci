import { SupportedLanguage } from "src/types"
import { create } from "zustand"

interface ILocalization {
  selectedLanguage: SupportedLanguage
  setSelectedLanguage: (language: SupportedLanguage) => void
}

export const useLocalization = create<ILocalization>((set) => ({
  selectedLanguage: "ko-KR",
  setSelectedLanguage: (language: SupportedLanguage) =>
    set({ selectedLanguage: language })
}))
