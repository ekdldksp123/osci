/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { cssMap, jsx } from "@atlaskit/css"
import { token } from "@atlaskit/tokens"

export const styles = cssMap({
  root: { padding: token("space.200") },
  primary: {
    backgroundColor: token("color.background.brand.bold"),
    color: token("color.text.inverse")
  },
  discovery: {
    backgroundColor: token("color.background.discovery.bold"),
    color: token("color.text.inverse")
  },
  success: {
    backgroundColor: token("color.background.success.bold"),
    color: token("color.text.inverse")
  },
  disabled: { opacity: 0, cursor: "not-allowed" },
  button: { marginTop: token("space.200") }
})
