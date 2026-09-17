'use client';

import { Card, Col, Row, Space, Tag, Typography } from 'antd';
import {
  AppstoreOutlined,
  BulbOutlined,
  DatabaseOutlined,
  GlobalOutlined,
  PlayCircleOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { Carousel } from 'antd';
import Image from 'next/image';
import youtube from "../../../public/youtube.png";
import facebook from "../../../public/facebook.webp";
import website from "../../../public/website.png";
import websites from "../../../public/websites.avif";
import dataentry from "../../../public/dataentry.jpg";
import ApexChart from '../Components/ApexChart';

const { Title, Text } = Typography;

const heroes = [
  { img: youtube, title: 'YouTube Promotion', sub: 'Grow real, engaged audiences' },
  { img: facebook, title: 'Facebook Advertising', sub: 'Pages & posts that convert' },
  { img: dataentry, title: 'Data Entry', sub: 'Accurate, on-time delivery' },
  { img: website, title: 'Web Development', sub: 'Fast, modern, responsive' },
  { img: websites, title: 'Digital Solutions', sub: 'Everything from the ground up' },
];

const features = [
  {
    icon: <RocketOutlined />,
    color: '#4F46E5',
    bg: '#EEF2FF',
    title: 'Fast Delivery',
    desc: 'Deadlines respected with quality you can count on.',
  },
  {
    icon: <GlobalOutlined />,
    color: '#06B6D4',
    bg: '#E0F2FE',
    title: 'Global Clients',
    desc: 'Trusted by clients across Asia, Europe and USA.',
  },
  {
    icon: <BulbOutlined />,
    color: '#10B981',
    bg: '#D1FAE5',
    title: 'Creative Strategy',
    desc: 'Data-driven campaigns tailored to your audience.',
  },
  {
    icon: <DatabaseOutlined />,
    color: '#F59E0B',
    bg: '#FEF3C7',
    title: 'Reliable Work',
    desc: 'Transparent process with live progress updates.',
  },
];

const Page = () => (
  <div>
    {/* Hero heading */}
    <div style={{ textAlign: 'center', marginBottom: 28 }}>
      <Tag icon={<AppstoreOutlined />} color="processing" style={{ borderRadius: 999, padding: '2px 14px' }}>
        Service Center
      </Tag>
      <Title
        level={2}
        style={{
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          fontWeight: 800,
          margin: '12px 0 6px',
          letterSpacing: '-0.02em',
        }}
      >
        Everything you need to <span className="text-gradient">grow</span>
      </Title>
      <Text type="secondary" style={{ fontSize: 15 }}>
        Digital marketing, web development and data entry — all in one place.
      </Text>
    </div>

    {/* Feature highlights */}
    <Row gutter={[14, 14]} style={{ marginBottom: 24 }}>
      {features.map((f) => (
        <Col key={f.title} xs={12} sm={12} md={6}>
          <Card
            style={{ height: '100%', borderRadius: 14 }}
            styles={{ body: { padding: 16 } }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: f.bg,
                color: f.color,
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            >
              {f.icon}
            </div>
            <Text strong style={{ fontSize: 14, display: 'block' }}>
              {f.title}
            </Text>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4 }}>
              {f.desc}
            </Text>
          </Card>
        </Col>
      ))}
    </Row>

    {/* Showcase carousel */}
    <Card
      style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid #E9EEF5' }}
      styles={{ body: { padding: 0 } }}
    >
      <Carousel autoplay effect="fade" dots>
        {heroes.map((slide, index) => (
          <div key={index} style={{ position: 'relative', height: 'clamp(200px, 40vh, 420px)' }}>
            <Image
              src={slide.img}
              alt={slide.title}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority={index === 0}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(11,17,32,0.72) 0%, rgba(11,17,32,0.15) 60%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 24,
                bottom: 28,
                color: '#fff',
                zIndex: 2,
                maxWidth: '70%',
              }}
            >
              <Space align="center" size={8}>
                <PlayCircleOutlined style={{ color: '#818CF8', fontSize: 20 }} />
                <Text style={{ color: '#C7D2FE', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Showcase
                </Text>
              </Space>
              <Title level={3} style={{ color: '#fff', margin: '6px 0 2px', fontWeight: 800 }}>
                {slide.title}
              </Title>
              <Text style={{ color: '#CBD5E1', fontSize: 15 }}>{slide.sub}</Text>
            </div>
          </div>
        ))}
      </Carousel>
    </Card>

    {/* Revenue breakdown */}
    <Card
      title={
        <Space>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4F46E5', display: 'inline-block' }} />
          Revenue Breakdown
        </Space>
      }
      style={{ marginTop: 24, borderRadius: 16 }}
    >
      <ApexChart />
    </Card>
  </div>
);

export default Page;