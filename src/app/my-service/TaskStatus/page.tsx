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
            title:"Name",
            dataIndex:"name",
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
            title:"Delivered",
            dataIndex:"delivered",
            render: function (data:string) {
          return data && dayjs(data).format("MMM D, YYYY hh:mm A");
            }
        },
        

    ]

const dataSource = [
  { key: '1', si: '1', name: 'Rafiq Ahmed', platform: 'Facebook Promote', budget: '10k', status: 'Delivered', delivered: 'Jan 15, 2023 10:30 AM' },
  { key: '2', si: '2', name: 'John Smith', platform: 'Youtube Promote', budget: '12k', status: 'Pending', delivered: 'Feb 20, 2023 02:45 PM' },
  { key: '3', si: '3', name: 'Farhana Akter', platform: 'Website Development and Design', budget: '15k', status: 'Delivered', delivered: 'Mar 05, 2023 09:15 AM' },
  { key: '4', si: '4', name: 'Michael Johnson', platform: 'Data Entry Clerk', budget: '9k', status: 'Pending', delivered: 'Apr 12, 2024 11:00 AM' },
  { key: '5', si: '5', name: 'Tariq Hossain', platform: 'Facebook Promote', budget: '11k', status: 'Delivered', delivered: 'May 18, 2024 04:20 PM' },
  { key: '6', si: '6', name: 'Emma Watson', platform: 'Youtube Promote', budget: '13k', status: 'Pending', delivered: 'Jun 25, 2025 01:10 PM' },
  { key: '7', si: '7', name: 'Kamal Uddin', platform: 'Website Development and Design', budget: '14k', status: 'Delivered', delivered: 'Jul 08, 2025 08:50 AM' },
  { key: '8', si: '8', name: 'Sophia Brown', platform: 'Data Entry Clerk', budget: '9.5k', status: 'Pending', delivered: 'Aug 14, 2025 03:30 PM' },
  { key: '9', si: '9', name: 'Hasan Ali', platform: 'Facebook Promote', budget: '10.5k', status: 'Delivered', delivered: 'Sep 21, 2024 12:00 PM' },
  { key: '10', si: '10', name: 'Oliver Davis', platform: 'Youtube Promote', budget: '12.5k', status: 'Pending', delivered: 'Oct 30, 2024 05:45 PM' },
  { key: '11', si: '11', name: 'Nusrat Jahan', platform: 'Website Development and Design', budget: '16k', status: 'Delivered', delivered: 'Nov 11, 2024 09:35 AM' },
  { key: '12', si: '12', name: 'Liam Wilson', platform: 'Data Entry Clerk', budget: '9.8k', status: 'Pending', delivered: 'Jan 19, 2025 02:25 PM' },
];




    return (
        <div>
            Task Status
            <ReuseableTable
                columns={columns}
                dataSource={dataSource}
            />
        </div>
    );
};

export default page;