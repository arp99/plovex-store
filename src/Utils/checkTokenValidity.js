import jwt_decode from "jwt-decode";

export const isTokenExpired = (token) =>
  jwt_decode(token).exp * 1000 < Date.now();
