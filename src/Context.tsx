import * as React from "react"
import { State } from "./Provider"

const AppContext = React.createContext<ContextType>({})

const { Provider, Consumer } = AppContext

type ContextType = State & {
  toggleCompleted?: (id: number) => void
}

const withAppContext = (Component) => {
  return function WrapperComponent(props) {
    return (
      <Consumer>
        {(context: ContextType) => <Component {...props} context={context} />}
      </Consumer>
    )
  }
}

export { Consumer, Provider, ContextType, withAppContext, AppContext }
