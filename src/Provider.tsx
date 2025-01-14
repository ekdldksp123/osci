import * as React from "react"
import { Todo } from "./types"
import { Provider } from "./Context"
const clonedeep = require("lodash.clonedeep")

export type State = {
  todos?: Todo[]
}

class AppProvider extends React.Component<{}, State> {
  state = {
    todos: null
  }
  componentDidMount() {
    this.loadData()
  }
  loadData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => this.setState({ todos: json }))
  }
  toggleCompleted = (id: number) => {
    // Use clonedeep because we want to copy the full object, not the reference
    const todos = clonedeep(this.state.todos)
    const todo = todos.find((t) => t.id === id)
    todo.completed = !todo.completed
    this.setState({ todos })
  }
  render() {
    return (
      <Provider
        value={{
          ...this.state,
          toggleCompleted: this.toggleCompleted
          // List functions here that you want to expose to context...
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export default AppProvider
