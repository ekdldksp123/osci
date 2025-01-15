import React, { FC, Suspense, lazy } from "react"
import { token, setGlobalTheme } from "@atlaskit/tokens"
import { Header, Sidebar } from "./components/layout"
import { Route, Link, Switch } from "react-router-dom"
import { Box } from "@atlaskit/primitives"

const Posts = lazy(() => import("./pages/posts"))
const Users = lazy(() => import("./pages/users"))
const Todos = lazy(() => import("./pages/todos"))

const App: FC = () => {
  setGlobalTheme({
    light: "light",
    dark: "dark",
    colorMode: "auto",
    typography: "typography-modernized"
  })
  return (
    <div id="app" style={{ backgroundColor: token("elevation.surface") }}>
      <Header />
      <Box style={{ display: "flex", width: "100%", height: "100%" }}>
        <Sidebar />
        <Box style={{ padding: token("space.100") }}>
          <Switch>
            <Suspense fallback={<div>Loading...</div>}>
              <Route exact path="/" component={Users} />
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/todos" component={Todos} />
            </Suspense>
          </Switch>
        </Box>
      </Box>
    </div>
  )
}

export default App
