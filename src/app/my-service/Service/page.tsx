"use client"
import React from 'react';
import { Card, Col, Divider, Row } from 'antd';
import Image from 'next/image';
import Youtube from "../../../../public/youtube.png";
import Facebook from "../../../../public/facebook.webp";
import Website from "../../../../public/website.png";

const { Meta } = Card;

const page: React.FC = () => (
  <>

  <Divider titlePlacement="left">Text</Divider>

    <Row gutter={[16, 16]} justify="center">
      <Col xs={24} sm={12} md={8}>
        <Card
          hoverable
          cover={
            <div style={{ width: '100%' }}>
              <Image src={Youtube} alt="Youtube Promotion" style={{ width: '100%', height: 'auto' }} />
            </div>
          }
        >
          <Meta title="Youtube Promotion" description="Contact me" />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Card
          hoverable
          cover={
            <div style={{ width: '100%' }}>
              <Image src={Facebook} alt="Facebook Promotion" style={{ width: '100%', height: 'auto' }} />
            </div>
          }
        >
          <Meta title="Facebook Promotion" description="Contact me" />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Card
          hoverable
          cover={
            <div style={{ width: '100%' }}>
              <Image src={Website} alt="Website Development" style={{ width: '100%', height: 'auto' }} />
            </div>
          }
        >
          <Meta title="Website Development" description="Contact me" />
        </Card>
      </Col>
    </Row>
  </>
);

export default page;
