"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App } from "antd";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#4F46E5",
              colorInfo: "#4F46E5",
              colorSuccess: "#10B981",
              colorWarning: "#F59E0B",
              colorError: "#EF4444",
              colorLink: "#4F46E5",
              colorLinkHover: "#6366F1",
              colorTextBase: "#0F172A",
              colorText: "#0F172A",
              colorTextSecondary: "#64748B",
              colorTextTertiary: "#94A3B8",
              colorBgBase: "#FFFFFF",
              colorBgLayout: "#F6F7FB",
              colorBgContainer: "#FFFFFF",
              colorBorder: "#E2E8F0",
              borderRadius: 10,
              fontFamily:
                "var(--font-geist-sans), 'Segoe UI', Roboto, Arial, sans-serif",
              controlHeight: 40,
              boxShadowSecondary: "0 8px 24px rgba(15, 23, 42, 0.1)",
            },
            components: {
              Button: {
                borderRadius: 10,
                controlHeight: 40,
                fontWeight: 500,
                primaryShadow: "0 8px 20px rgba(79, 70, 229, 0.28)",
              },
              Card: {
                borderRadiusLG: 16,
                headerBg: "#FFFFFF",
              },
              Table: {
                headerBg: "#F1F5F9",
                headerColor: "#334155",
                headerSplitColor: "transparent",
                rowHoverBg: "#EEF2FF",
                borderColor: "#E9EEF5",
              },
              Modal: { borderRadiusLG: 16 },
              Menu: {
                itemBorderRadius: 10,
                darkItemBg: "transparent",
                darkItemColor: "#94A3B8",
                darkItemHoverBg: "rgba(99, 102, 241, 0.16)",
                darkItemHoverColor: "#FFFFFF",
                darkItemSelectedBg: "#4F46E5",
                darkItemSelectedColor: "#FFFFFF",
              },
              Layout: {
                siderBg: "#0B1120",
                headerBg: "#FFFFFF",
                headerHeight: 64,
                headerPadding: "0 24px",
              },
              Skeleton: { gradientFromColor: "#E2E8F0" },
            },
          }}
        >
          <App>{children}</App>
        </ConfigProvider>
      </AntdRegistry>
    </Provider>
  );
};

export default Providers;