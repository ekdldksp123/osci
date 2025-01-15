import * as React from "react"
import { render } from "react-dom"
import TodoListClass from "./components/example/class"
import Provider from "./Provider"
import "@atlaskit/css-reset"
import "./locales"

const App = () => {
  return (
    <Provider>
      <TodoListClass />
    </Provider>
  )
}

render(<App />, document.getElementById("root"))
