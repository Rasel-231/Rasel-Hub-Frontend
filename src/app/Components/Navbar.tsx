"use client";

import { useEffect, useState } from "react";
import {
  App,
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Grid,
  Space,
  Spin,
  Tag,
  Tooltip,
} from "antd";
import {
  AppstoreOutlined,
  DashboardOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  RocketOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLoginMutation, useLogoutMutation, useVerifyQuery } from "../hooks/api/api";
import type { MenuProps } from "antd";

const { useBreakpoint } = Grid;

const stop = {
  height: 64,
  background: "linear-gradient(90deg, #0B1120 0%, #121F3D 100%)",
  boxShadow: "0 4px 20px rgba(11, 17, 32, 0.35)",
};

const brandTextStyle = {
  color: "#FFFFFF",
  fontWeight: 800,
  fontSize: 18,
  letterSpacing: "0.04em",
  lineHeight: 1,
};

const linkBase: React.CSSProperties = {
  color: "#CBD5E1",
  fontSize: 15,
  fontWeight: 500,
  padding: "6px 10px",
  borderRadius: 8,
  transition: "color .2s ease, background .2s ease",
  whiteSpace: "nowrap",
};

const linkActive: React.CSSProperties = {
  ...linkBase,
  color: "#FFFFFF",
  background: "rgba(99, 102, 241, 0.22)",
  boxShadow: "inset 0 0 0 1px rgba(129, 140, 248, 0.35)",
};

const CustomNavbar = () => {
  const { message, modal } = App.useApp();
  const router = useRouter();
  const pathname = usePathname();
  const screens = useBreakpoint();
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    data: verifiedToken,
    isLoading: verifyLoading,
    refetch,
  } = useVerifyQuery(undefined);
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

  // Avoid hydration mismatch on SSR: only switch to mobile layout after mount.
  useEffect(() => setMounted(true), []);
  // Close drawer on navigation.
  useEffect(() => setDrawerOpen(false), [pathname]);

  const isMobile = mounted && screens.lg === false;
  const isLoggedIn = Boolean(verifiedToken?.success);

  const navItems = [
    { key: "/", label: "Home", icon: <HomeOutlined /> },
    { key: "/my-service", label: "My Services", icon: <AppstoreOutlined /> },
    { key: "/my-service/Profile", label: "Dashboard", icon: <DashboardOutlined /> },
    ...(isLoggedIn
      ? [
          { key: "/entry", label: "Entry", icon: <RocketOutlined /> },
          { key: "/username", label: "Users", icon: <UserOutlined /> },
        ]
      : []),
  ];

  const activeKey =
    navItems.find(
      (item) =>
        pathname === item.key ||
        (item.key !== "/" && pathname.startsWith(item.key))
    )?.key || "/";

  const handleLogin = async () => {
    const id = verifiedToken?.userId;
    if (!id) {
      // Not verified yet — take the user to the login form on the hero.
      router.push("/");
      return;
    }
    try {
      await login({ userId: id }).unwrap();
      message.success("Login Successful!");
      router.push("/username");
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      message.error(error.data?.message || "Login failed");
    }
  };

  const handleLogout = () => {
    modal.confirm({
      title: "Log out?",
      icon: <LogoutOutlined />,
      content: "Are you sure you want to sign out?",
      okText: "Yes, Logout",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      okButtonProps: { loading: logoutLoading },
      onOk: async () => {
        try {
          await logout(undefined).unwrap();
          message.success("Logged out successfully");
        } catch {
          message.error("Logout failed");
        } finally {
          await refetch();
          router.push("/");
        }
      },
    });
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link href="/username">My Users</Link>,
    },
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/my-service/Profile">Dashboard</Link>,
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      danger: true,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const drawerMenu = (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {navItems.map((item) => (
        <Link key={item.key} href={item.key}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 500,
              color: activeKey === item.key ? "#FFFFFF" : "#94A3B8",
              background:
                activeKey === item.key ? "rgba(99,102,241,0.22)" : "transparent",
            }}
          >
            {item.icon}
            {item.label}
          </div>
        </Link>
      ))}
      <div style={{ marginTop: 4, paddingTop: 12, borderTop: "1px solid rgba(148,163,184,0.16)" }}>
        {isLoggedIn ? (
          <Button
            block
            danger
            icon={<LogoutOutlined />}
            loading={logoutLoading}
            onClick={handleLogout}
            style={{ background: "rgba(239,68,68,0.12)", border: "none" }}
          >
            Logout
          </Button>
        ) : (
          <Button
            block
            type="primary"
            icon={<RocketOutlined />}
            loading={loginLoading}
            onClick={handleLogin}
          >
            Login
          </Button>
        )}
      </div>
      {isLoggedIn && (
        <Space style={{ marginTop: 16, justifyContent: "center" }} size={8}>
          <Avatar size={40} style={{ background: "linear-gradient(135deg,#4F46E5,#06B6D4)" }} icon={<UserOutlined />} />
          <span style={{ color: "#CBD5E1", fontWeight: 600 }}>Rasel Hasan</span>
          <Tag color="green" style={{ marginInlineEnd: 0 }}>Active</Tag>
        </Space>
      )}
    </div>
  );

  return (
    <>
      <header
        style={{
          ...stop,
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          className="page-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            height: 64,
          }}
        >
          {/* Brand */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <Avatar
              size={38}
              shape="square"
              style={{
                background: "linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)",
                fontWeight: 800,
                fontSize: 18,
                color: "#fff",
                borderRadius: 10,
              }}
            >
              RH
            </Avatar>
            <span style={brandTextStyle}>
              RASEL<span style={{ color: "#818CF8" }}>HUB</span>
            </span>
          </Link>

          {/* Desktop inline links */}
          <nav style={{ display: isMobile ? "none" : "flex", gap: 4, justifyContent: "center", flex: 1 }}>
            {navItems.map((item) => (
              <Link key={item.key} href={item.key}>
                <span style={pathname === item.key ? linkActive : linkBase}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          {isMobile ? (
            <Button
              type="text"
              style={{ color: "#fff", fontSize: 20 }}
              icon={<MenuOutlined />}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            />
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {verifyLoading ? (
                <Spin size="small" />
              ) : isLoggedIn ? (
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={["click"]}>
                  <Space style={{ cursor: "pointer" }}>
                    <Avatar
                      size={40}
                      style={{ background: "linear-gradient(135deg,#4F46E5,#06B6D4)" }}
                      icon={<UserOutlined />}
                    />
                    <Tooltip title="Signed in">
                      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
                        <span style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>Rasel Hasan</span>
                        <span style={{ color: "#64748B", fontSize: 12 }}>Admin</span>
                      </div>
                    </Tooltip>
                  </Space>
                </Dropdown>
              ) : (
                <Button
                  type="primary"
                  ghost
                  icon={<RocketOutlined />}
                  loading={loginLoading}
                  onClick={handleLogin}
                  style={{ borderColor: "rgba(129,140,248,0.6)", color: "#C7D2FE" }}
                >
                  Login
                </Button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="left"
        width={280}
        closable
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar
              size={32}
              shape="square"
              style={{ background: "linear-gradient(135deg, #4F46E5, #06B6D4)", borderRadius: 8, fontWeight: 800, fontSize: 14 }}
            >
              RH
            </Avatar>
            <span style={{ color: "#fff", fontWeight: 700, letterSpacing: "0.04em" }}>RASELHUB</span>
          </div>
        }
        styles={{
          header: { background: "#0B1120", borderBottom: "1px solid rgba(148,163,184,0.16)", padding: "16px" },
          body: { background: "#0B1120", padding: 16 },
        }}
      >
        {drawerMenu}
      </Drawer>
    </>
  );
};

export default CustomNavbar;