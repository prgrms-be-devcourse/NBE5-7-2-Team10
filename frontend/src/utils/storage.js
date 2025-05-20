// src/utils/storage.js
const TOKEN_KEY = {
  ACCESS: "access_token",
  REFRESH: "refresh_token",
  USER_ID: "userId",
  NICKNAME: "nickname",
  ROLE: "role",
};

export const getAccessToken = () => localStorage.getItem(TOKEN_KEY.ACCESS);

export const getRefreshToken = () => localStorage.getItem(TOKEN_KEY.REFRESH);

export const getUserId = () => localStorage.getItem(TOKEN_KEY.USER_ID);

export const getNickname = () => localStorage.getItem(TOKEN_KEY.NICKNAME);

export const getRole = () => localStorage.getItem(TOKEN_KEY.ROLE);

export const getUserInfo = () => {
  const accessToken = localStorage.getItem(TOKEN_KEY.ROLE);
  const refreshToken = localStorage.getItem(TOKEN_KEY.REFRESH);
  const userId = localStorage.getItem(TOKEN_KEY.USER_ID);
  const nickname = localStorage.getItem(TOKEN_KEY.NICKNAME);
  const role = localStorage.getItem(TOKEN_KEY.ROLE);

  return { accessToken, refreshToken, userId, nickname, role };
};

export const isSignedIn = () => {
  const refreshToken = localStorage.getItem(TOKEN_KEY.REFRESH);
  if (refreshToken !== null) {
    return true;
  }

  return false;
};

export const isSignedUp = () => {
  const role = localStorage.getItem(TOKEN_KEY.ROLE);
  if (role !== null && role !== "ROLE_TMP") {
    return true;
  }

  return false;
};

export const setTokens = ({
  accessToken,
  refreshToken,
  userId,
  nickname,
  role,
}) => {
  localStorage.setItem(TOKEN_KEY.ACCESS, accessToken);
  localStorage.setItem(TOKEN_KEY.REFRESH, refreshToken);
  localStorage.setItem(TOKEN_KEY.USER_ID, userId);
  localStorage.setItem(TOKEN_KEY.NICKNAME, nickname);
  localStorage.setItem(TOKEN_KEY.ROLE, role);
};

export const setAccessToken = ({ accessToken }) => {
  localStorage.setItem(TOKEN_KEY.ACCESS, accessToken);
};

export const setNickname = (nickname) => {
  localStorage.setItem(TOKEN_KEY.NICKNAME, nickname);
};

export const setRole = (role) => {
  localStorage.setItem(TOKEN_KEY.ROLE, role);
};


export const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY.ACCESS);
  localStorage.removeItem(TOKEN_KEY.REFRESH);
  localStorage.removeItem(TOKEN_KEY.USER_ID);
  localStorage.removeItem(TOKEN_KEY.NICKNAME);
  localStorage.removeItem(TOKEN_KEY.ROLE);
};
