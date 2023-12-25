const ACCESS_TOKEN_KEY: "accessToken" = "accessToken";
const REFRESH_TOKEN_KEY: "refreshToken" = "refreshToken";
export const setAccessToken = (value: string): void =>
  localStorage.setItem(ACCESS_TOKEN_KEY, value);
export const setRefreshToken = (value: string): void =>
  localStorage.setItem(REFRESH_TOKEN_KEY, value);
export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN_KEY);
export const removeAccessToken = (): void =>
  localStorage.removeItem(ACCESS_TOKEN_KEY);
export const removeRefreshToken = (): void =>
  localStorage.removeItem(REFRESH_TOKEN_KEY);
