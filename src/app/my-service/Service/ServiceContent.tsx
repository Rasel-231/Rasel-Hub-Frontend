"use client";
import React from "react";
import { Button, Card, Col, Divider, Row, Space, Tag, Typography } from "antd";
import Image from "next/image";
import {
  MessageOutlined,
  RiseOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import Youtube from "../../../../public/youtube.png";
import Facebook from "../../../../public/facebook.webp";
import Website from "../../../../public/website.jpg";

const { Meta } = Card;
const { Title, Text } = Typography;

const services = [
  {
    title: "YouTube Promotion",
    description:
      "Boost visibility and grow subscribers with targeted, organic promotion strategies.",
    image: Youtube,
    tag: "Reach",
  },
  {
    title: "Facebook Promotion",
    description:
      "Page growth, post boosting and engagement campaigns that convert followers to customers.",
    image: Facebook,
    tag: "Engage",
  },
  {
    title: "Website Development",
    description:
      "Modern, responsive and high-performance websites built to take your business online.",
    image: Website,
    tag: "Build",
  },
];

const ServiceContent: React.FC = () => (
  <>
    <Title level={4} style={{ marginBottom: 4, fontWeight: 800 }}>
      What I<span className="text-gradient"> Offer</span>
    </Title>
    <Text type="secondary" style={{ display: "block", marginBottom: 8 }}>
      Hand-picked services crafted with a professional touch
    </Text>
    <Divider style={{ marginTop: 8 }} />

    <Row gutter={[16, 16]}>
      {services.map((service) => (
        <Col key={service.title} xs={24} sm={12} md={8}>
          <Card
            hoverable
            style={{ height: "100%", borderRadius: 16, overflow: "hidden" }}
            cover={
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 180,
                  background: "linear-gradient(135deg,#EEF2FF,#E0F2FE)",
                }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            }
          >
            <Meta
              title={
                <Space align="center" size={8} wrap>
                  {service.title}
                  <Tag color="processing" style={{ marginInlineEnd: 0 }}>
                    {service.tag}
                  </Tag>
                </Space>
              }
              description={
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {service.description}
                </Text>
              }
            />
            <Divider style={{ margin: "16px 0 12px" }} />
            <Space size={16} style={{ fontSize: 13, color: "#475569" }}>
              <span>
                <RiseOutlined style={{ color: "#10B981" }} /> Growth
              </span>
              <span>
                <ThunderboltOutlined style={{ color: "#F59E0B" }} /> Fast
              </span>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>

    <Card
      style={{ marginTop: 24, borderRadius: 16, textAlign: "center" }}
      styles={{ body: { padding: "28px 20px" } }}
    >
      <Title level={5} style={{ marginTop: 0 }}>
        Need something custom?
      </Title>
      <Text type="secondary">
        Let&apos;s talk about your project — contact me to get started.
      </Text>
      <div style={{ marginTop: 16 }}>
        <Button
          type="primary"
          size="large"
          href="mailto:rasel.byte64@gmail.com"
          icon={<MessageOutlined />}
          style={{ borderRadius: 12, paddingInline: 28 }}
        >
          Contact Me
        </Button>
      </div>
    </Card>
  </>
);

export default ServiceContent;