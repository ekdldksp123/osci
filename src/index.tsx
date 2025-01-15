import * as React from "react"
import { render } from "react-dom"
import { BrowserRouter } from "react-router-dom"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "@atlaskit/css-reset"
import "./locales"
import App from "./App"

const queryClient = new QueryClient()

render(
  // <React.StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
)
