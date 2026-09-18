import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_TOKEN_KEY } from "./session";

/**
 * Server-side route guard for protected pages.
 * Redirects to the login screen (remembering the original destination)
 * when the frontend-origin session flag cookie is missing.
 */
export async function requireAuth(redirectTo: string = "/username") {
  const token = (await cookies()).get(ACCESS_TOKEN_KEY)?.value;
  if (!token) {
    redirect(`/login?redirect=${encodeURIComponent(redirectTo)}`);
  }
}