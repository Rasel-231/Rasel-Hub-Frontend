"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App } from "antd"; // Import App

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#1677ff",
            },
          }}
        >
          
          <App>
            {children}
          </App>
        </ConfigProvider>
      </AntdRegistry>
    </Provider>
  );
};

export default Providers;