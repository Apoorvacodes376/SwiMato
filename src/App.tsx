import { BrowserRouter } from "react-router-dom"
import Router from "./router"
import { ThemeProvider } from "styled-components"
import { theme } from "./theme/theme"

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}
