import React, { useState } from "react"

import { ModalTransition } from "@atlaskit/modal-dialog"

export default ({
  children
}: {
  children: (isOpen: boolean, toggle: () => void) => JSX.Element
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggle = () => setIsOpen((prev) => !prev)
  return <ModalTransition>{children(isOpen, toggle)}</ModalTransition>
}
