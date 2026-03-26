'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Client-side only import
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ApexChart = () => {
  const [state] = React.useState<{
    series: number[];
    options: ApexOptions;
  }>({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        type: 'pie' as const,
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <ReactApexChart options={state.options} series={state.series} type="pie" width="100%" />
    </div>
  );
};

export default ApexChart;
