"use client";

import React from "react";
import { Space, Typography } from "antd";

const { Title, Text } = Typography;

type PageHeaderProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  extra?: React.ReactNode;
};

const PageHeader = ({ icon, title, subtitle, extra }: PageHeaderProps) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    }}
  >
    <Space size={14} align="center">
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "linear-gradient(135deg, #EEF2FF, #E0F2FE)",
          color: "#4F46E5",
          fontSize: 20,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <Title level={4} style={{ margin: 0, fontWeight: 700, letterSpacing: "-0.01em" }}>
          {title}
        </Title>
        {subtitle && (
          <Text type="secondary" style={{ fontSize: 13 }}>
            {subtitle}
          </Text>
        )}
      </div>
    </Space>
    {extra}
  </div>
);

export default PageHeader;