"use client";
import { Col, Row, Space, Tooltip, Typography } from "antd";
import {
  CopyrightOutlined,
  FacebookFilled,
  GithubFilled,
  InstagramFilled,
  LinkedinFilled,
  MailOutlined,
  PhoneOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Text } = Typography;

const brand = (
  <Space align="center" size={10}>
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 34,
        height: 34,
        background: "linear-gradient(135deg, #4F46E5, #06B6D4)",
        borderRadius: 8,
        color: "#fff",
        fontWeight: 800,
        fontSize: 16,
      }}
    >
      RH
    </span>
    <Text
      style={{
        color: "#fff",
        fontSize: 17,
        fontWeight: 800,
        letterSpacing: "0.04em",
      }}
    >
      RASEL<span style={{ color: "#818CF8" }}>HUB</span>
    </Text>
  </Space>
);

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/my-service", label: "My Services" },
  { href: "/my-service/Profile", label: "Dashboard" },
  { href: "/entry", label: "Entry" },
  { href: "/username", label: "Users" },
];

const socials = [
  {
    icon: <FacebookFilled />,
    href: "https://facebook.com",
    color: "#3b82f6",
    label: "Facebook",
  },
  {
    icon: <InstagramFilled />,
    href: "https://instagram.com",
    color: "#E1306C",
    label: "Instagram",
  },
  {
    icon: <LinkedinFilled />,
    href: "https://linkedin.com",
    color: "#0A66C2",
    label: "LinkedIn",
  },
  {
    icon: <GithubFilled />,
    href: "https://github.com",
    color: "#a1a1aa",
    label: "GitHub",
  },
];

const CustomFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{ background: "#0B1120", color: "#94A3B8", marginTop: "auto" }}
    >
      <div className="gradient-line" />
      <div
        className="page-container"
        style={{ paddingTop: 32, paddingBottom: 16 }}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={8}>
            <Space orientation="vertical" size={12}>
              {brand}
              <Text
                style={{
                  color: "#94A3B8",
                  fontSize: 14,
                  display: "block",
                  maxWidth: 340,
                }}
              >
                Professional digital services — web development, YouTube &
                Facebook promotion and reliable data entry. One hub for all your
                growth.
              </Text>
              <Space size={10}>
                <SafetyCertificateOutlined style={{ color: "#34d399" }} />
                <Text style={{ color: "#CBD5E1", fontSize: 13 }}>
                  100% verified & reliable
                </Text>
              </Space>
            </Space>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Text style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
              Quick Links
            </Text>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px 24px",
                marginTop: 12,
              }}
            >
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Text
                    style={{
                      color: "#94A3B8",
                      fontSize: 14,
                      transition: "color .2s",
                    }}
                  >
                    {link.label}
                  </Text>
                </Link>
              ))}
            </div>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Text style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
              Get in Touch
            </Text>
            <Space
              orientation="vertical"
              size={10}
              style={{ marginTop: 12, width: "100%" }}
            >
              <Space size={8}>
                <PhoneOutlined style={{ color: "#818CF8" }} />
                <a
                  href="tel:+8801988446825"
                  style={{ color: "#94A3B8", fontSize: 14 }}
                >
                  +880 1988 446825
                </a>
              </Space>
              <Space size={8}>
                <MailOutlined style={{ color: "#818CF8" }} />
                <a
                  href="mailto:rasel.byte64@gmail.com"
                  style={{ color: "#94A3B8", fontSize: 14 }}
                >
                  rasel.byte64@gmail.com
                </a>
              </Space>
              <Space align="center" size={10}>
                {socials.map((s) => (
                  <TooltipWrapper key={s.label} title={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        background: "rgba(148,163,184,0.12)",
                        color: s.color,
                        fontSize: 16,
                        transition: "transform .2s ease, background .2s ease",
                      }}
                      onMouseEnter={(
                        e: React.MouseEvent<HTMLAnchorElement>,
                      ) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.background =
                          "rgba(148,163,184,0.22)";
                      }}
                      onMouseLeave={(
                        e: React.MouseEvent<HTMLAnchorElement>,
                      ) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.background =
                          "rgba(148,163,184,0.12)";
                      }}
                    >
                      {s.icon}
                    </a>
                  </TooltipWrapper>
                ))}
              </Space>
            </Space>
          </Col>
        </Row>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(148,163,184,0.16)",
          padding: "14px 20px",
          textAlign: "center",
        }}
      >
        <Space size={6}>
          <RocketOutlined style={{ color: "#818CF8" }} />
          <Text style={{ color: "#64748B", fontSize: 13 }}>
            RASEL HUB © {year} — Crafted with care by{" "}
          </Text>
          <Text style={{ color: "#818CF8", fontSize: 13, fontWeight: 600 }}>
            Rasel Hasan
          </Text>
          <CopyrightOutlined style={{ color: "#475569", fontSize: 12 }} />
        </Space>
      </div>
    </footer>
  );
};

const TooltipWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => <Tooltip title={title}>{children}</Tooltip>;

export default CustomFooter;
