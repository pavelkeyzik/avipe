import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@avipe/design-system";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { AuthorizedLayout } from "./components/AuthorizedLayout/AuthorizedLayout";
import { SoundList } from "./pages/SoundList";
import { Login } from "./pages/Login";
import { SpotifyAuthCallback } from "./pages/SpotifyAuthCallback";
import { QueryClientProvider, QueryClient } from "react-query";
import { PlayerProvider } from "./core/hooks/use-player";
import { Playlist } from "./pages/Playlist";
import { Profile } from "./pages/Profile";
import { Genres } from "./pages/Genres/Genres";
import { SoundsByGenre } from "./pages/Genres/SoundsByGenre";
import { AuthProvider, useAuthState } from "./core/hooks/use-auth";

const queryClient = new QueryClient();

function Application() {
  const { isAuthorized } = useAuthState();

  if (isAuthorized) {
    return (
      <PlayerProvider>
        <AuthorizedLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="sound/*" element={<Outlet />}>
              <Route path="/" element={<SoundList />} />
            </Route>
            <Route path="genres/*" element={<Outlet />}>
              <Route path="/" element={<Genres />} />
              <Route path="/:id" element={<SoundsByGenre />} />
            </Route>
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </AuthorizedLayout>
      </PlayerProvider>
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
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <Application />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
