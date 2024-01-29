import { ThemeProvider } from "@emotion/react"
import { purpleTheme } from "./purple"
import { CssBaseline } from "@mui/material"
import React from "react"
import { ChildrenComponent } from "../interfaces/childrenComponent"

export const AppTheme: React.FC<ChildrenComponent> = ({ children }) => {
    return (
        <ThemeProvider theme={purpleTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
