/**
 * Session cookie helpers for the frontend origin.
 *
 * The backend authenticates via its OWN httpOnly cookies on its own origin,
 * so the Next.js origin cannot see them. On a successful login the API returns
 * the access token in the response body; we only mirror a Boolean *presence
 * flag* into a same-origin `accessToken` cookie so route guards can decide
 * whether a session exists without storing a live token in a JS-readable
 * cookie (XSS would otherwise be able to exfiltrate it).
 *
 * The flag is just "1" — the real token never leaves the backend's httpOnly
 * cookie. Actual authentication is always re-validated server-side via the
 * `/auth/verify` endpoint.
 */

export const ACCESS_TOKEN_KEY = "accessToken";
const ACCESS_TOKEN_MAX_AGE = 15 * 60; // seconds (matches backend cookie lifetime)

const writeAccessToken = (value: string, maxAge: number) => {
  const secure = typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie = `${ACCESS_TOKEN_KEY}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${secure ? "; Secure" : ""}`;
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
  writeAccessToken("1", ACCESS_TOKEN_MAX_AGE);
  return true;
};

/** Remove the same-origin access token flag cookie. */
export const clearSession = () => {
  writeAccessToken("", 0);
};

/** `true` when the frontend-origin access token flag cookie is present. */
export const hasAccessToken = (): boolean =>
  typeof document !== "undefined" && document.cookie.includes(`${ACCESS_TOKEN_KEY}=1`);