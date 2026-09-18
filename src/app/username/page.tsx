import type { Metadata } from "next";
import UserName from "./clientUserName/username";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsernamePage() {
  return <UserName />;
}