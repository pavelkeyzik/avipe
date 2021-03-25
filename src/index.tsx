import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { AuthorizedLayout } from "./components/AuthorizedLayout";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthorizedLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="sound/*" element={<div>Sound</div>} />
            <Route path="profile/*" element={<div>Profile</div>} />
          </Routes>
        </AuthorizedLayout>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
