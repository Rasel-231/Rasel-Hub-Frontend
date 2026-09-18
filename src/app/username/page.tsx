import type { Metadata } from "next";
import UserName from "./clientUserName/username";
import { requireAuth } from "@/app/lib/authGuard";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsernamePage() {
  await requireAuth("/username");
  return <UserName />;
}