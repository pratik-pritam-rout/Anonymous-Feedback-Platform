// src/admin/utils/auth.js

export const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiryTime = payload.exp * 1000; // convert to ms
    return Date.now() > expiryTime;
  } catch (err) {
    return true; // treat invalid token as expired
  }
};
