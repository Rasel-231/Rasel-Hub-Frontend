"use client";

import { App, Avatar, Space, Spin } from "antd";
import { UserOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginMutation, useLogoutMutation, useVerifyQuery } from "../hooks/api/api";


const CustomNavbar = () => {
  const { message } = App.useApp();
  const router = useRouter();
  const { data: verifiedToken, isLoading: verifyLoading ,refetch} = useVerifyQuery(undefined);
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  const handleLogin = async () => {
    const id = verifiedToken?.userId;
    if (!id) return router.push("/");

    try {
      await login({ userId: id }).unwrap();
      router.push("/username"); 
    } catch  {
      message.error("Login failed");
    }
  };

const handleLogout = async () => {
  try {
    const res = await logout(undefined).unwrap();
    if(res?.success ===false){
      await refetch();
    }
    router.push("/");
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        height: "64px",
        backgroundColor: "#001529",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Left: Home */}
      <div style={{ flex: 1 }}>
        <Link href="/">
          <HomeOutlined style={{ fontSize: 24, color: "#fff" }} />
        </Link>
      </div>

      {/* Center: menu links */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: "30px", color: "#fff" }}>
        <Link href="/my-service">
          <span style={{ color: "#fff" }}>Services</span>
        </Link>

        {verifiedToken?.success && (
          <>
            <Link href="/entry"><span style={{ color: "#fff" }}>Entry</span></Link>
            <Link href="/username"><span style={{ color: "#fff" }}>User</span></Link>
          </>
        )}
      </div>

      {/* Right: Avatar/Login/Logout */}
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        {verifyLoading ? (
          <Spin size="small" />
        ) : verifiedToken?.success ? (
          <Space>
            <Avatar
              size="large"
              icon={<LogoutOutlined />}
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            />
          </Space>
        ) : (
          <Space>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{ cursor: "pointer" }}
              onClick={handleLogin}
            />
          </Space>
        )}
      </div>
    </div>
  );
};

export default CustomNavbar;
