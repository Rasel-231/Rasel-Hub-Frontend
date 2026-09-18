'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';
import type { ApexOptions } from 'apexcharts';

const ChartFallback = () => (
  <div
    style={{
      height: 380,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Spin description="Loading chart..." />
  </div>
);

// Client-side only import
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <ChartFallback />,
});

const ApexChart = () => {
  const [state] = React.useState<{
    series: number[];
    options: ApexOptions;
  }>({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        type: 'donut',
        toolbar: { show: false },
      },
      labels: ['Facebook Promote', 'YouTube Promote', 'Web Development', 'Data Entry', 'Others'],
      colors: ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#94A3B8'],
      stroke: { width: 2, colors: ['#fff'] },
      dataLabels: { enabled: false },
      legend: {
        position: 'bottom' as const,
        horizontalAlign: 'center',
        fontSize: '13px',
        fontFamily: 'inherit',
        markers: { size: 8, shape: 'circle' },
        itemMargin: { horizontal: 8, vertical: 4 },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '68%',
            labels: {
              show: true,
              name: { fontSize: '13px', color: '#64748B' },
              value: { fontSize: '20px', fontWeight: 700 as const, color: '#0F172A' },
              total: {
                show: true,
                label: 'Total',
                color: '#94A3B8',
                fontSize: '12px',
                formatter: () => '177',
              },
            },
          },
        },
      },
      tooltip: { theme: 'light', fillSeriesColor: false },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: { position: 'bottom' as const, fontSize: '12px' },
          },
        },
      ],
    },
  });

  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', minHeight: 300 }}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
        width="100%"
        height={380}
      />
    </div>
  );
};

export default ApexChart;