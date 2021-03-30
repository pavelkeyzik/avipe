import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const spotify = {
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID || "",
  clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || "",
};

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const params = new URLSearchParams();
      params.append("grant_type", "refresh_token");
      params.append(
        "refresh_token",
        localStorage.getItem("refresh_token") || ""
      );

      return axios
        .post("https://accounts.spotify.com/api/token", params, {
          headers: {
            Authorization: `Basic ${btoa(
              spotify.clientId + ":" + spotify.clientSecret
            )}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          if (res && res.status === 201) {
            localStorage.setItem("access_token", res.data.access_token);

            axios.defaults.headers.common["Authorization"] =
              "Bearer " + localStorage.getItem("access_token");

            return axios(originalRequest);
          }
        });
    }
  }
);

async function login() {
  const scope = "user-read-private user-read-email";
  const link = `https://accounts.spotify.com/authorize?response_type=code&client_id=${encodeURIComponent(
    spotify.clientId
  )}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
    "https://localhost:3000/spotify-auth-callback"
  )}`;

  window.location.href = link;
}

async function getAccessToken(code: string) {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "https://localhost:3000/spotify-auth-callback");

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      params,
      {
        headers: {
          Authorization: `Basic ${btoa(
            spotify.clientId + ":" + spotify.clientSecret
          )}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    spotifyApi.setAccessToken(response.data.access_token);

    return true;
  } catch (err) {
    return false;
  }
}

async function getUserInfo() {
  return await spotifyApi.getMe();
}

async function getNewReleases() {
  return await spotifyApi.getNewReleases({
    limit: 4,
  });
}

async function getPlaylists() {
  return await spotifyApi.searchPlaylists("meditation", {
    limit: 4,
  });
}

export { spotifyApi };
export const api = {
  login,
  getAccessToken,
  getUserInfo,
  getNewReleases,
  getPlaylists,
};
