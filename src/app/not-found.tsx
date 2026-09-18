"use client"

import Image from 'next/image';
import NotfoundImg from "../../public/errorPages.png"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Result, Space, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Text } = Typography;

const NotFoundPages = () => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const time = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(time);
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px", textAlign: "center" }}>
      <Result
        status="404"
        title="Page Not Found"
        subTitle="The page you are looking for doesn't exist or has been moved."
        icon={
          <div style={{ position: "relative", width: "min(100%, 360px)", margin: "0 auto" }}>
            <Image src={NotfoundImg} alt="Not found" style={{ width: "100%", height: "auto" }} priority />
          </div>
        }
        extra={
          <Space orientation="vertical" size={12}>
            <Button type="primary" size="large" icon={<HomeOutlined />} onClick={() => router.push("/")}>
              Back to Home
            </Button>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Redirecting in {seconds}s...
            </Text>
          </Space>
        }
      />
    </div>
  );
};

export default NotFoundPages;