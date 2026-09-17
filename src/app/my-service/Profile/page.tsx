"use client";
import React from "react";
import { Avatar, Card, Col, Divider, Row, Space, Tag, Tooltip, Typography } from "antd";
import {
  EnvironmentOutlined,
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  MailOutlined,
  PhoneOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const socials = [
  { icon: <FacebookFilled />, href: "https://facebook.com", color: "#3b82f6", label: "Facebook" },
  { icon: <InstagramFilled />, href: "https://instagram.com", color: "#E1306C", label: "Instagram" },
  { icon: <LinkedinFilled />, href: "https://linkedin.com", color: "#0A66C2", label: "LinkedIn" },
];

const paymentMethods = ["bKash", "Nagad", "Rocket", "Crypto"];

const contactRows = [
  {
    icon: <MailOutlined />,
    label: "Email",
    value: "rasel.byte64@example.com",
    href: "mailto:rasel.byte64@example.com",
  },
  {
    icon: <PhoneOutlined />,
    label: "Contact",
    value: "+880 1988 446825",
    href: "tel:+8801988446825",
  },
  {
    icon: <EnvironmentOutlined />,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: undefined,
  },
];

const ProfileCard: React.FC = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid #E9EEF5",
        }}
        styles={{ body: { padding: 0 } }}
      >
        {/* Cover */}
        <div
          style={{
            height: 120,
            background: "linear-gradient(120deg, #1E1B4B 0%, #4F46E5 55%, #06B6D4 100%)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(400px 160px at 80% 0%, rgba(6,182,212,0.35), transparent 70%)",
            }}
          />
          <Tag
            icon={<VerifiedOutlined />}
            color="success"
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              borderRadius: 999,
              padding: "2px 12px",
            }}
          >
            Verified
          </Tag>
        </div>

        <div style={{ padding: "0 24px 24px", marginTop: -44 }}>
          {/* Avatar */}
          <div style={{ position: "relative", width: 92 }}>
            <Avatar
              size={88}
              src="/profile.jpg"
              style={{
                border: "4px solid #fff",
                boxShadow: "0 8px 24px rgba(15,23,42,0.18)",
                background: "#E2E8F0",
              }}
            />
            <span
              title="Online"
              style={{
                position: "absolute",
                right: 2,
                bottom: 6,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#34D399",
                border: "3px solid #fff",
              }}
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <Typography.Title level={3} style={{ margin: 0, fontWeight: 800 }}>
              Rasel Hasan
            </Typography.Title>
            <Text type="secondary">Full-Stack Developer · Freelancer</Text>
          </div>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            {socials.map((s) => (
              <Tooltip key={s.label} title={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "#F1F5F9",
                    color: s.color,
                    fontSize: 18,
                    transition: "transform .2s ease, background .2s ease",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.background = "#E0E7FF";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "#F1F5F9";
                  }}
                >
                  {s.icon}
                </a>
              </Tooltip>
            ))}
          </div>

          <Divider style={{ margin: "20px 0 16px" }} />

          {/* Contact info */}
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            {contactRows.map((row) => (
              <div
                key={row.label}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}
              >
                <Space size={10}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: "#EEF2FF",
                      color: "#4F46E5",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {row.icon}
                  </div>
                  <Text strong>{row.label}</Text>
                </Space>
                {row.href ? (
                  <a href={row.href} style={{ color: "#4F46E5", fontSize: 14 }}>
                    {row.value}
                  </a>
                ) : (
                  <Text style={{ fontSize: 14 }}>{row.value}</Text>
                )}
              </div>
            ))}
          </Space>

          <Divider style={{ margin: "20px 0 16px" }} />

          {/* Payment gateways */}
          <Text strong style={{ display: "block", marginBottom: 10 }}>
            Payment Gateways
          </Text>
          <Row gutter={[8, 8]}>
            {paymentMethods.map((method) => (
              <Col key={method}>
                <Tag
                  style={{
                    padding: "4px 14px",
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 600,
                    background: "#F1F5F9",
                    border: "1px solid #E2E8F0",
                    color: "#334155",
                  }}
                >
                  {method}
                </Tag>
              </Col>
            ))}
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCard;