import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { AuthorizedLayout } from "./components/AuthorizedLayout";
import { SoundList } from "./pages/SoundList";
import { SoundPlayer } from "./pages/SoundPlayer";
import { GlobalStyle } from "./components/GlobalStyle";
import { Login } from "./pages/Login";

function Application() {
  const isAuthorized = false;

  if (isAuthorized) {
    return (
      <AuthorizedLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="sound/*" element={<Outlet />}>
            <Route path="/" element={<SoundList />} />
            <Route path="/play" element={<SoundPlayer />} />
          </Route>
          <Route path="profile/*" element={<div>Profile</div>} />
        </Routes>
      </AuthorizedLayout>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
