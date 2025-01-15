export type Todo = {
  completed: boolean
  id: number
  title: string
  userId: number
}

export type MenuItem = {
  href: string
  localKey: string
}

export type SupportedLanguage = "ko-KR" | "en-US"
