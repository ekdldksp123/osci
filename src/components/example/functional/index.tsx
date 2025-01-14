import * as React from "react"
import colors from "src/util/colors"
const { useContext } = React
import { AppContext, ContextType } from "../../../Context"

export default () => {
  const { todos, toggleCompleted } = useContext<ContextType>(AppContext)
  if (todos) {
    if (todos.length) {
      return (
        <ul>
          {todos.map((todo) => (
            // Lists/maps must have a key so it knows when to re-render, react will throw warning if missing, just use something unique
            // but don't use a timestamp or it will always re-render (learned the hard way)
            <li
              style={{
                color: todo.completed ? colors.green[500] : colors.red[500]
              }}
              key={todo.id}
              onClick={() => toggleCompleted(todo.id)}
            >
              {todo.title}
            </li>
          ))}
        </ul>
      )
    } else {
      return "No Todos"
    }
  }
  return null
}
