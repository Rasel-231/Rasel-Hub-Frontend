"use client";

import ReuseableTable from "@/app/Components/ReuseableTable";
import PageHeader from "@/app/Components/PageHeader";
import { Card, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { UsergroupAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

interface ClientHunt {
  key: string;
  si: number;
  name: string;
  category: string;
  budget: number;
  country: string;
  delivered: string;
}

const categoryColor = (category: string) => {
  if (category.includes("Facebook")) return "blue";
  if (category.includes("Youtube")) return "red";
  if (category.includes("Website")) return "purple";
  return "geekblue";
};

const columns: ColumnsType<ClientHunt> = [
  { title: "SI", dataIndex: "si", width: 70, align: "center" },
  { title: "Client", dataIndex: "name", render: (v: string) => <strong>{v}</strong> },
  {
    title: "Category",
    dataIndex: "category",
    render: (v: string) => <Tag color={categoryColor(v)}>{v}</Tag>,
  },
  {
    title: "Budget",
    dataIndex: "budget",
    align: "right",
    render: (v: number) => `৳ ${v.toLocaleString("en-US")}`,
  },
  { title: "Country", dataIndex: "country" },
  {
    title: "Delivered Date",
    dataIndex: "delivered",
    render: (data: string) => (data ? dayjs(data).format("MMM D, YYYY hh:mm A") : "-"),
  },
];

const dataSource: ClientHunt[] = [
  { key: "1", si: 1, name: "Rafiq Ahmed", category: "Facebook Promote", budget: 5000, country: "Bangladesh", delivered: "2023-01-15T10:30:00" },
  { key: "2", si: 2, name: "Alempruas Pio", category: "Youtube Promote", budget: 8000, country: "Germany", delivered: "2023-02-20T14:45:00" },
  { key: "3", si: 3, name: "Farhana Akter", category: "Website Development and Design", budget: 15000, country: "Bangladesh", delivered: "2023-03-05T09:15:00" },
  { key: "4", si: 4, name: "Michael Petrik", category: "Data Entry Clerk", budget: 9000, country: "USA", delivered: "2024-04-12T11:00:00" },
  { key: "5", si: 5, name: "Tariq Hossain", category: "Facebook Promote", budget: 4500, country: "Bangladesh", delivered: "2024-05-18T16:20:00" },
  { key: "6", si: 6, name: "Emma Watson", category: "Youtube Promote", budget: 7000, country: "Austria", delivered: "2025-06-25T13:10:00" },
  { key: "7", si: 7, name: "Kamal Uddin", category: "Website Development and Design", budget: 14000, country: "Bangladesh", delivered: "2025-07-08T08:50:00" },
  { key: "8", si: 8, name: "Sophia Brown", category: "Data Entry Clerk", budget: 9500, country: "USA", delivered: "2025-08-14T15:30:00" },
  { key: "9", si: 9, name: "Hasan Ali", category: "Facebook Promote", budget: 4500, country: "Pakistan", delivered: "2024-09-21T12:00:00" },
  { key: "10", si: 10, name: "Annuara Arifam", category: "Youtube Promote", budget: 7500, country: "Indonesia", delivered: "2024-10-30T17:45:00" },
  { key: "11", si: 11, name: "Nusrat Jahan", category: "Website Development and Design", budget: 16500, country: "Bangladesh", delivered: "2024-11-11T09:35:00" },
  { key: "12", si: 12, name: "Liam Wilson", category: "Data Entry Clerk", budget: 7500, country: "UK", delivered: "2025-01-19T14:25:00" },
];

const Page = () => (
  <div>
    <PageHeader
      icon={<UsergroupAddOutlined />}
      title="Client Hunts"
      subtitle="Leads and projects secured from clients worldwide"
      extra={<Tag color="blue">{dataSource.length} clients</Tag>}
    />
    <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 14, overflow: "hidden" }}>
      <ReuseableTable columns={columns} dataSource={dataSource} />
    </Card>
  </div>
);

export default Page;