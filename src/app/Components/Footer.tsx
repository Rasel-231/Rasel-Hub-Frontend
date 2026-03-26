"use client";
import { Layout } from "antd";
const { Footer } = Layout;
const CustomFooter = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
        bottom: "0",
        position: "sticky",
        zIndex: "1000",
      }}
    >
      Nihon&apos;s Dairy ll ©{new Date().getFullYear()} Created by RASEL
    </Footer>
  );
};

export default CustomFooter;
