'use client'; // Ensure this page can render client components like ApexChart

import { Carousel } from 'antd';
import Image from 'next/image';
import youtube from "../../../public/youtube.png";
import facebook from "../../../public/facebook.webp";
import website from "../../../public/website.png";
import websites from "../../../public/websites.avif";
import dataentry from "../../../public/dataentry.jpg";
import ApexChart from '../Components/ApexChart';


const contentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#364d79',
};

const Page = () => {
  const images = [youtube, facebook, dataentry, website, websites];

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>My Services</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px', padding: '0 20px' }}>
        We offer a variety of services to help you achieve your goals.
      </p>

      {/* Carousel */}
      <Carousel autoplay>
        {images.map((img, index) => (
          <div key={index}>
            <div style={contentStyle}>
              <Image
                src={img}
                alt={`Service ${index + 1}`}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                sizes="100vw"
              />
            </div>
          </div>
        ))}
      </Carousel>

      {/* Centered ApexChart */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '50px 0',
        }}
      >
        <ApexChart />
      </div>
    </div>
  );
};

export default Page;
