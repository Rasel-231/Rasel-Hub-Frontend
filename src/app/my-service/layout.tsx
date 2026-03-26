"use client";

import React, { useState } from "react";
import {
  ApartmentOutlined,
  BarChartOutlined,
  DollarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout as MyLayout, Menu, theme } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { Header, Sider, Content } = MyLayout;
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    { key: "/my-service/Profile", icon: <UserOutlined />, label: "My Profile", href: "/my-service/Profile" },
    { key: "/my-service/Service", icon: <ApartmentOutlined />, label: "My Service", href: "/my-service/Service" },
    { key: "/my-service/ClientHunts", icon: <UsergroupAddOutlined />, label: "Client Hunt", href: "/my-service/ClientHunts" },
    { key: "/my-service/TaskStatus", icon: <BarChartOutlined />, label: "Task Status", href: "/my-service/TaskStatus" },
    { key: "/my-service/Payment", icon: <DollarOutlined />, label: "Payment", href: "/my-service/Payment" },
  ];

  const activeKey = menuItems.find((item) => pathname.startsWith(item.key))?.key || "";

  return (
    <MyLayout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} trigger={null} width={200} collapsedWidth={80}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey]}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: <Link href={item.href}>{item.label}</Link>,
          }))}
        />
      </Sider>

      <MyLayout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16, width: 64, height: 64 }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children} {/* This will render your clicked page */}
        </Content>
      </MyLayout>
    </MyLayout>
  );
};

export default Layout;
