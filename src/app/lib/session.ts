/**
 * Session cookie helpers for the frontend origin.
 *
 * On a successful login the API returns the access token in the response body.
 * We mirror the real token into a same-origin `accessToken` cookie so that:
 *  - route guards (`proxy.ts`) can decide whether a session exists,
 *  - API requests can send it as `Authorization: Bearer <token>`.
 *
 * The cookie expires after 15 minutes (matching the backend access-token
 * lifetime). NOTE: because it is set from the browser, it cannot be `httpOnly`;
 * if you need to harden against XSS, prefer the backend httpOnly cookie flow.
 */

export const ACCESS_TOKEN_KEY = "accessToken";
const ACCESS_TOKEN_MAX_AGE = 15 * 60; // seconds (matches backend access token lifetime)

const writeAccessToken = (value: string, maxAge: number) => {
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie = `${ACCESS_TOKEN_KEY}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${secure ? "; Secure" : ""}`;
};

const readRawCookie = (): string => {
  if (typeof document === "undefined") return "";
  const row = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${ACCESS_TOKEN_KEY}=`));
  if (!row) return "";
  return row.slice(ACCESS_TOKEN_KEY.length + 1);
};

/**
 * Mark a session as present after a successful login.
 * Accepts the full RTK Query result (`{ data: { token } }`) or the payload itself.
 * Returns `true` when the API reported a token (i.e. login succeeded).
 */
export const setSession = (result: unknown): boolean => {
  const res = (result ?? {}) as { data?: unknown };
  const payload = (res.data ?? res) as { token?: unknown };
  const token = typeof payload.token === "string" ? payload.token : "";
  if (!token) return false;
  writeAccessToken(token, ACCESS_TOKEN_MAX_AGE);
  return true;
};

/** Remove the same-origin access token cookie. */
export const clearSession = () => {
  writeAccessToken("", 0);
};

/** The real access token stored on the frontend origin (empty string if none). */
export const readAccessToken = (): string => {
  const value = readRawCookie();
  return value ? decodeURIComponent(value) : "";
};

/** `true` when the frontend-origin access token cookie is present. */
export const hasAccessToken = (): boolean => readAccessToken() !== "";