import { Suspense } from "react";
import LoginPage from "./LoginPage";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}