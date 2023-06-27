import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import "./style/index.css";
import reportWebVitals from "./reportWebVitals";
import Router from "./routers/Router";
import { CookiesProvider } from "react-cookie";
import { StyledEngineProvider } from "@mui/styled-engine";
import { ThemeProvider } from "@emotion/react";
import theme from "style/muiTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyledEngineProvider injectFirst>
    <RecoilRoot>
      <React.StrictMode>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </CookiesProvider>
      </React.StrictMode>
    </RecoilRoot>
  </StyledEngineProvider>
);
reportWebVitals();
