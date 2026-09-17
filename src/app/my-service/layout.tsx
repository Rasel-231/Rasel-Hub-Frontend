"use client";

import React, { useState } from "react";
import {
  ApartmentOutlined,
  BarChartOutlined,
  DollarOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Drawer,
  Grid,
  Layout as MyLayout,
  Menu,
  theme,
  Typography,
} from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Header, Sider, Content } = MyLayout;
const { useBreakpoint } = Grid;
const { Title } = Typography;

const menuItems = [
  { key: "/my-service/Profile", icon: <UserOutlined />, label: "My Profile", href: "/my-service/Profile" },
  { key: "/my-service/Service", icon: <ApartmentOutlined />, label: "My Service", href: "/my-service/Service" },
  { key: "/my-service/ClientHunts", icon: <UsergroupAddOutlined />, label: "Client Hunt", href: "/my-service/ClientHunts" },
  { key: "/my-service/TaskStatus", icon: <BarChartOutlined />, label: "Task Status", href: "/my-service/TaskStatus" },
  { key: "/my-service/Payment", icon: <DollarOutlined />, label: "Payment", href: "/my-service/Payment" },
];

const SiderBrand = ({ collapsed }: { collapsed?: boolean }) => (
  <div
    style={{
      height: 64,
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: collapsed ? "0 16px" : "0 20px",
      borderBottom: "1px solid rgba(148,163,184,0.14)",
    }}
  >
    <Avatar
      size={34}
      shape="square"
      style={{
        background: "linear-gradient(135deg, #4F46E5, #06B6D4)",
        fontWeight: 800,
        fontSize: 15,
        color: "#fff",
        borderRadius: 9,
        flexShrink: 0,
      }}
    >
      RH
    </Avatar>
    {!collapsed && (
      <span style={{ color: "#fff", fontWeight: 800, fontSize: 16, letterSpacing: "0.04em" }}>
        RASEL<span style={{ color: "#818CF8" }}>HUB</span>
      </span>
    )}
  </div>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const screens = useBreakpoint();

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const isMobile = screens.lg === false;
  const activeKey = menuItems.find((item) => pathname.startsWith(item.key))?.key || "";
  const activeItem = menuItems.find((item) => item.key === activeKey);

  const menu = (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[activeKey]}
      inlineCollapsed={collapsed && !isMobile}
      items={menuItems.map((item) => ({
        key: item.key,
        icon: item.icon,
        label: <Link href={item.href}>{item.label}</Link>,
      }))}
      onClick={() => setDrawerOpen(false)}
    />
  );

  return (
    <MyLayout style={{ minHeight: "100vh" }}>
      {/* Desktop sider */}
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          trigger={null}
          breakpoint="lg"
          onBreakpoint={(broken) => setCollapsed(broken)}
          width={220}
          collapsedWidth={80}
          style={{ position: "sticky", top: 64, height: "calc(100vh - 64px)", overflow: "auto" }}
        >
          <SiderBrand collapsed={collapsed} />
          <div style={{ padding: "12px 8px" }}>{menu}</div>
        </Sider>
      )}

      {/* Mobile drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="left"
        width={260}
        closable
        title={<SiderBrand />}
        styles={{
          header: { background: "#0B1120", borderBottom: "1px solid rgba(148,163,184,0.14)", padding: 0 },
          body: { background: "#0B1120", padding: "12px 8px" },
        }}
      >
        {menu}
      </Drawer>

      <MyLayout style={{ minWidth: 0 }}>
        {/* Top bar */}
        <Header
          style={{
            position: "sticky",
            top: 64,
            zIndex: 99,
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(10px)",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            borderBottom: "1px solid #E9EEF5",
          }}
        >
          <Button
            type="text"
            aria-label="Toggle menu"
            icon={isMobile ? <MenuOutlined /> : collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => (isMobile ? setDrawerOpen(true) : setCollapsed(!collapsed))}
            style={{ fontSize: 18, width: 44, height: 44 }}
          />
          {activeItem && (
            <Title
              level={4}
              style={{ margin: 0, fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              {activeItem.label}
            </Title>
          )}
        </Header>

        <Content
          style={{
            margin: isMobile ? "16px" : "24px",
            padding: isMobile ? 16 : 24,
            minHeight: 280,
            background: "#FFFFFF",
            borderRadius: borderRadiusLG,
            boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
            overflow: "hidden",
          }}
        >
          {children}
        </Content>
      </MyLayout>
    </MyLayout>
  );
};

export default Layout;