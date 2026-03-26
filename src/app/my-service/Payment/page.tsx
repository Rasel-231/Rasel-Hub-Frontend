"use client"

import ReuseableTable from '@/app/Components/ReuseableTable';
import dayjs from 'dayjs';
import React from 'react';

const page = () => {
    const columns = [
         {
            title:"SI",
            dataIndex:"si",
        },
        {
            title:"Wallet",
            dataIndex:"wallet",
        },
        {
            title:"Platform",
            dataIndex:"platform",
        },
        {
            title:"Budget",
            dataIndex:"budget",
        },
        {
            title:"Status",
            dataIndex:"status",
        },
        {
            title:"CreatedAt",
            dataIndex:"createdAt",
            render: function (data:string) {
          return data && dayjs(data).format("MMM D, YYYY hh:mm A");
            }
        },
        

    ]

const dataSource = [
  { key: '1', si: '1', wallet: 'Bkash', platform: 'Facebook Promote', budget: '5000', status: 'Paid', createdAt: 'Jan 15, 2023 10:30 AM' },
  { key: '2', si: '2', wallet: 'Rocket', platform: 'Youtube Promote', budget: '8000', status: 'Unpaid', createdAt: 'Feb 20, 2023 02:45 PM' },
  { key: '3', si: '3', wallet: 'Nagad', platform: 'Website Development and Design', budget: '15000', status: 'Partial', createdAt: 'Mar 05, 2023 09:15 AM' },
  { key: '4', si: '4', wallet: 'Crypto', platform: 'Data Entry Clerk', budget: '9000', status: 'Paid', createdAt: 'Apr 12, 2024 11:00 AM' },
  { key: '5', si: '5', wallet: 'Bkash', platform: 'Facebook Promote', budget: '4500', status: 'Unpaid', createdAt: 'May 18, 2024 04:20 PM' },
  { key: '6', si: '6', wallet: 'Rocket', platform: 'Youtube Promote', budget: '7000', status: 'Partial', createdAt: 'Jun 25, 2025 01:10 PM' },
  { key: '7', si: '7', wallet: 'Nagad', platform: 'Website Development and Design', budget: '14000', status: 'Paid', createdAt: 'Jul 08, 2025 08:50 AM' },
  { key: '8', si: '8', wallet: 'Crypto', platform: 'Data Entry Clerk', budget: '9500', status: 'Partial', createdAt: 'Aug 14, 2025 03:30 PM' },
  { key: '9', si: '9', wallet: 'Bkash', platform: 'Facebook Promote', budget: '4500', status: 'Paid', createdAt: 'Sep 21, 2024 12:00 PM' },
  { key: '10', si: '10', wallet: 'Rocket', platform: 'Youtube Promote', budget: '7500', status: 'Unpaid', createdAt: 'Oct 30, 2024 05:45 PM' },
  { key: '11', si: '11', wallet: 'Nagad', platform: 'Website Development and Design', budget: '16500', status: 'Paid', createdAt: 'Nov 11, 2024 09:35 AM' },
  { key: '12', si: '12', wallet: 'Crypto', platform: 'Data Entry Clerk', budget: '7500', status: 'Partial', createdAt: 'Jan 19, 2025 02:25 PM' },
];



    return (
        <div>
            Payments
            <ReuseableTable
                columns={columns}
                dataSource={dataSource}
            />
        </div>
    );
};

export default page;