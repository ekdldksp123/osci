import * as React from "react"
import { withAppContext, ContextType } from "../../../Context"
import colors from "../../../util/colors"

type Props = {
  context: ContextType
}

type State = {}

class TodoList extends React.Component<Props, State> {
  render() {
    const { todos, toggleCompleted } = this.props.context
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
}

export default withAppContext(TodoList)
