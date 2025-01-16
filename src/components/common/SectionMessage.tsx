import React from "react"

import SectionMessage, { type Appearance } from "@atlaskit/section-message"

interface SectionMessageProps {
  type: Appearance
  message: string
}

export default ({ type, message }: SectionMessageProps) => (
  <SectionMessage title={type.toLocaleUpperCase()} appearance={type}>
    <p>{message}</p>
  </SectionMessage>
)
