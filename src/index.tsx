import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { AuthorizedLayout } from "./components/AuthorizedLayout";
import { SoundList } from "./pages/SoundList";
import { GlobalStyle } from "./components/GlobalStyle";
import { Login } from "./pages/Login";
import {
  SpotifyAuthProvider,
  useAuthState,
} from "./core/hooks/use-spotify-auth";
import { SpotifyAuthCallback } from "./pages/SpotifyAuthCallback";
import { QueryClientProvider, QueryClient } from "react-query";
import { PlayerProvider } from "./core/hooks/use-player";

const queryClient = new QueryClient();

function Application() {
  const { isAuthorized } = useAuthState();

  if (isAuthorized) {
    return (
      <AuthorizedLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="sound/*" element={<Outlet />}>
            <Route path="/" element={<SoundList />} />
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
        <Route
          path="/spotify-auth-callback"
          element={<SpotifyAuthCallback />}
        />
      </Routes>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <SpotifyAuthProvider>
      <PlayerProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter>
              <Application />
            </BrowserRouter>
          </ThemeProvider>
        </QueryClientProvider>
      </PlayerProvider>
    </SpotifyAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
