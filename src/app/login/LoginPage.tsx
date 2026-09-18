"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar, Spin, Tag, Typography } from "antd";
import { RocketOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import LoginForm from "@/app/Components/LoginForm";
import { useVerifyQuery } from "@/app/hooks/api/api";
import { hasAccessToken } from "@/app/lib/session";

const { Title, Text } = Typography;

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect");
  const redirect =
    rawRedirect && rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
      ? rawRedirect
      : "/username";
  const { data: verify, isLoading } = useVerifyQuery(undefined);

  const alreadyLoggedIn = Boolean(verify?.success);

  // Already authenticated? Skip the login screen.
  useEffect(() => {
    if (!isLoading && alreadyLoggedIn && hasAccessToken()) {
      router.replace(redirect);
    }
  }, [isLoading, alreadyLoggedIn, redirect, router]);

  return (
    <section
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        background:
          "radial-gradient(900px 480px at 50% -10%, rgba(99,102,241,0.25), transparent 60%), linear-gradient(160deg, #0B1120 0%, #111C31 60%, #1E1B4B 100%)",
      }}
    >
      <div
        className="glass-card"
        style={{
          width: "min(100%, 420px)",
          padding: "36px 30px",
          background: "rgba(15, 23, 42, 0.72)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Avatar
            size={60}
            style={{
              background: "linear-gradient(135deg, #4F46E5, #06B6D4)",
              fontSize: 28,
              fontWeight: 800,
              marginBottom: 14,
            }}
          >
            RH
          </Avatar>
          <Title
            level={3}
            style={{ color: "#fff", margin: 0, fontWeight: 800, letterSpacing: "0.02em" }}
          >
            RASEL<span style={{ color: "#818CF8" }}>HUB</span>
          </Title>
          <Text style={{ color: "#94A3B8", display: "block", marginTop: 4 }}>
            Sign in to continue
          </Text>
          {redirect !== "/username" && (
            <Tag
              icon={<RocketOutlined />}
              style={{ marginTop: 10, borderRadius: 999, padding: "2px 12px" }}
            >
              Continue to {redirect}
            </Tag>
          )}
        </div>

        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
            <Spin size="large" />
          </div>
        ) : (
          <LoginForm redirectTo={redirect} dark />
        )}

        <div style={{ marginTop: 18, textAlign: "center" }}>
          <SafetyCertificateOutlined style={{ color: "#34D399", marginRight: 6 }} />
          <Text style={{ color: "#64748B", fontSize: 12 }}>
            Authenticated via encrypted session tokens
          </Text>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;