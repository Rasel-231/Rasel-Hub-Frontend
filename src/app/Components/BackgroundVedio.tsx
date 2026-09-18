"use client";

import LoginForm from "@/app/Components/LoginForm";
import React from "react";
import {
  AppstoreOutlined,
  DashboardOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Space, Spin, Tag, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useVerifyQuery } from "../hooks/api/api";

const { Text } = Typography;

const BackgroundVideo = () => {
  const { data: verifyUser, isLoading: verifyLoading } = useVerifyQuery(undefined);
  const router = useRouter();
  const isLoggedIn = Boolean(verifyUser?.success);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "calc(100vh - 64px)",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source
          src="https://res.cloudinary.com/dmq2gxidt/video/upload/v1756411392/bg-video_gytenx.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Cinematic overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(160deg, rgba(11,17,32,0.78) 0%, rgba(15,23,42,0.55) 55%, rgba(30,27,75,0.78) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 480px at 50% 30%, rgba(99,102,241,0.22), transparent 65%)",
        }}
      />

      {/* Content */}
      <div
        className="page-container"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "48px 20px",
        }}
      >
        {verifyLoading ? (
          <Space orientation="vertical" size={18} align="center">
            <Spin size="large" />
            <Text style={{ color: "#CBD5E1" }}>Checking session...</Text>
          </Space>
        ) : isLoggedIn ? (
          <>
            <Space orientation="vertical" size={16} style={{ alignItems: "center" }}>
              <Tag
                icon={<SafetyCertificateOutlined />}
                color="success"
                style={{ padding: "4px 14px", fontSize: 13, borderRadius: 999 }}
              >
                Onboarded
              </Tag>
              <Typography.Title
                level={1}
                style={{
                  color: "#FFFFFF",
                  fontSize: "clamp(2.2rem, 6vw, 4rem)",
                  fontWeight: 800,
                  margin: 0,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                Welcome back,
                <br />
                <span className="text-gradient">
                  {verifyUser?.data?.username || "Mr. Rasel"}
                </span>
              </Typography.Title>
              <Text style={{ color: "#CBD5E1", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", maxWidth: 520 }}>
                Your command center is ready. Manage services, clients and payments
                from one beautiful dashboard.
              </Text>
              <Space
                size={12}
                style={{ flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}
              >
                <Button
                  type="primary"
                  size="large"
                  icon={<DashboardOutlined />}
                  onClick={() => router.push("/my-service/Profile")}
                  style={{ borderRadius: 12, paddingInline: 28 }}
                >
                  Go to Dashboard
                </Button>
                <Button
                  size="large"
                  icon={<AppstoreOutlined />}
                  onClick={() => router.push("/my-service")}
                  style={{
                    borderRadius: 12,
                    paddingInline: 28,
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.28)",
                    color: "#fff",
                  }}
                >
                  My Services
                </Button>
              </Space>
            </Space>
          </>
        ) : (
          <div
            className="glass-card"
            style={{
              width: "min(100%, 400px)",
              padding: "32px 28px 26px",
              background: "rgba(11,17,32,0.62)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <Avatar
              size={58}
              style={{
                background: "linear-gradient(135deg, #4F46E5, #06B6D4)",
                fontSize: 28,
                fontWeight: 800,
                marginBottom: 12,
              }}
            >
              RH
            </Avatar>
            <Typography.Title
              level={3}
              style={{ color: "#FFFFFF", margin: "0 0 4px", fontWeight: 800, letterSpacing: "0.02em" }}
            >
              RASEL<span style={{ color: "#818CF8" }}>HUB</span>
            </Typography.Title>
            <Typography.Text style={{ color: "#94A3B8", display: "block", marginBottom: 20 }}>
              Sign in to unlock your dashboard
            </Typography.Text>
            <LoginForm redirectTo="/username" dark />
            <div style={{ marginTop: 16 }}>
              <Space size={6} style={{ justifyContent: "center", width: "100%" }}>
                <RocketOutlined style={{ color: "#FBBF24" }} />
                <Text style={{ color: "#64748B", fontSize: 12 }}>
                  Free demo access for clients
                </Text>
              </Space>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BackgroundVideo;