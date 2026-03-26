'use client';
import React from 'react';
import { Card, Tooltip } from 'antd';
import { FacebookFilled, InstagramFilled, LinkedinFilled } from '@ant-design/icons';
import profile from '../../../../public/profile.jpg';
import Image from 'next/image';


const ProfileCard: React.FC = () => {
  return (

<>





    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '12px',
        }}
      >
        {/* Avatar */}
        <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 20px', borderRadius: '50%', overflow: 'hidden' }}>
          <Image src={profile} alt="Profile" fill style={{ objectFit: 'cover' }} />
        </div>

        {/* User Info */}
        <h2 style={{ marginBottom: 5 }}>Rasel Hasan</h2>
        <p style={{ margin: '5px 0' }}>
          Email: <a href="mailto:rasel.byte64@example.com" style={{ color: '#1890ff' }}>rasel.byte64@example.com</a>
        </p>
        <p style={{ margin: '5px 0' }}>
          Contact: <a href="tel:+8801988446825" style={{ color: '#1890ff' }}>+8801988446825</a>
        </p>
        <p style={{ margin: '5px 0' }}>Location: Dhaka, Bangladesh</p>

        {/* Social Icons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', margin: '15px 0' }}>
          <Tooltip title="Facebook">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookFilled style={{ fontSize: '24px', color: '#3b5998' }} />
            </a>
          </Tooltip>
          <Tooltip title="Instagram">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramFilled style={{ fontSize: '24px', color: '#E1306C' }} />
            </a>
          </Tooltip>
          <Tooltip title="LinkedIn">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedinFilled style={{ fontSize: '24px', color: '#0A66C2' }} />
            </a>
          </Tooltip>
        </div>

        {/* Payment Methods */}
        <div style={{ marginTop: '10px' }}>
          <p style={{ fontWeight: 500 }}>Payment Gateways:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span>bKash</span> | <span>Nagad</span> | <span>Rocket</span> | <span>Crypto</span>
          </div>
        </div>
      </Card>
    </div>
    </>
  );
};

export default ProfileCard;