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
            title:"Category",
            dataIndex:"category",
        },
        {
            title:"Budget",
            dataIndex:"budget",
        },
        {
            title:"Country",
            dataIndex:"country",
        },
        {
            title:"Delivered Date",
            dataIndex:"delivered",
            render: function (data:string) {
          return data && dayjs(data).format("MMM D, YYYY hh:mm A");
            }
        },
        

    ]


    const dataSource = [
        { key: '1', si: '1', name: 'Rafiq Ahmed', category: 'Facebook Promote', budget: '5000', country: 'Bangladesh', delivered: 'Jan 15, 2023 10:30 AM' },
        { key: '2', si: '2', name: 'Alempruas Pio', category: 'Youtube Promote', budget: '8000', country: 'Germany', delivered: 'Feb 20, 2023 02:45 PM' },
        { key: '3', si: '3', name: 'Farhana Akter', category: 'Website Development and Design', budget: '15000', country: 'Bangladesh', delivered: 'Mar 05, 2023 09:15 AM' },
        { key: '4', si: '4', name: 'Michael Petrik', category: 'Data Entry Clerk', budget: '9000', country: 'USA', delivered: 'Apr 12, 2024 11:00 AM' },
        { key: '5', si: '5', name: 'Tariq Hossain', category: 'Facebook Promote', budget: '4500', country: 'Bangladesh', delivered: 'May 18, 2024 04:20 PM' },
        { key: '6', si: '6', name: 'Emma Watson', category: 'Youtube Promote', budget: '7000', country: 'Austria', delivered: 'Jun 25, 2025 01:10 PM' },
        { key: '7', si: '7', name: 'Kamal Uddin', category: 'Website Development and Design', budget: '14000', country: 'Bangladesh', delivered: 'Jul 08, 2025 08:50 AM' },
        { key: '8', si: '8', name: 'Sophia Brown', category: 'Data Entry Clerk', budget: '9500', country: 'USA', delivered: 'Aug 14, 2025 03:30 PM' },
        { key: '9', si: '9', name: 'Hasan Ali', category: 'Facebook Promote', budget: '4500', country: 'Pakistan', delivered: 'Sep 21, 2024 12:00 PM' },
        { key: '10', si: '10', name: 'Annuara Arifam', category: 'Youtube Promote', budget: '7500', country: 'Indonesia', delivered: 'Oct 30, 2024 05:45 PM' },
        { key: '11', si: '11', name: 'Nusrat Jahan', category: 'Website Development and Design', budget: '16500', country: 'Bangladesh', delivered: 'Nov 11, 2024 09:35 AM' },
        { key: '12', si: '12', name: 'Liam Wilson', category: 'Data Entry Clerk', budget: '7500', country: 'UK', delivered: 'Jan 19, 2025 02:25 PM' },
    ];





    return (
        <div>
            Client Hunts
            <ReuseableTable
                columns={columns}
                dataSource={dataSource}
            />
        </div>
    );
};

export default page;