"use client";

import ReuseableTable from "@/app/Components/ReuseableTable";
import PageHeader from "@/app/Components/PageHeader";
import { Card, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BarChartOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

interface Task {
  key: string;
  si: number;
  name: string;
  platform: string;
  budget: number;
  status: "Delivered" | "Pending";
  delivered: string;
}

const statusColor: Record<string, "success" | "warning" | "default"> = {
  Delivered: "success",
  Pending: "warning",
};

const columns: ColumnsType<Task> = [
  { title: "SI", dataIndex: "si", width: 70, align: "center" },
  { title: "Client", dataIndex: "name", render: (v: string) => <strong>{v}</strong> },
  { title: "Platform", dataIndex: "platform" },
  {
    title: "Budget",
    dataIndex: "budget",
    align: "right",
    render: (v: number) => `৳ ${v.toLocaleString("en-US")}`,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: string) => (
      <Tag color={statusColor[status] ?? "default"}>{status}</Tag>
    ),
  },
  {
    title: "Delivered",
    dataIndex: "delivered",
    render: (data: string) => (data ? dayjs(data).format("MMM D, YYYY hh:mm A") : "-"),
  },
];

const dataSource: Task[] = [
  { key: "1", si: 1, name: "Rafiq Ahmed", platform: "Facebook Promote", budget: 10000, status: "Delivered", delivered: "2023-01-15T10:30:00" },
  { key: "2", si: 2, name: "John Smith", platform: "Youtube Promote", budget: 12000, status: "Pending", delivered: "2023-02-20T14:45:00" },
  { key: "3", si: 3, name: "Farhana Akter", platform: "Website Development and Design", budget: 15000, status: "Delivered", delivered: "2023-03-05T09:15:00" },
  { key: "4", si: 4, name: "Michael Johnson", platform: "Data Entry Clerk", budget: 9000, status: "Pending", delivered: "2024-04-12T11:00:00" },
  { key: "5", si: 5, name: "Tariq Hossain", platform: "Facebook Promote", budget: 11000, status: "Delivered", delivered: "2024-05-18T16:20:00" },
  { key: "6", si: 6, name: "Emma Watson", platform: "Youtube Promote", budget: 13000, status: "Pending", delivered: "2025-06-25T13:10:00" },
  { key: "7", si: 7, name: "Kamal Uddin", platform: "Website Development and Design", budget: 14000, status: "Delivered", delivered: "2025-07-08T08:50:00" },
  { key: "8", si: 8, name: "Sophia Brown", platform: "Data Entry Clerk", budget: 9500, status: "Pending", delivered: "2025-08-14T15:30:00" },
  { key: "9", si: 9, name: "Hasan Ali", platform: "Facebook Promote", budget: 10500, status: "Delivered", delivered: "2024-09-21T12:00:00" },
  { key: "10", si: 10, name: "Oliver Davis", platform: "Youtube Promote", budget: 12500, status: "Pending", delivered: "2024-10-30T17:45:00" },
  { key: "11", si: 11, name: "Nusrat Jahan", platform: "Website Development and Design", budget: 16000, status: "Delivered", delivered: "2024-11-11T09:35:00" },
  { key: "12", si: 12, name: "Liam Wilson", platform: "Data Entry Clerk", budget: 9800, status: "Pending", delivered: "2025-01-19T14:25:00" },
];

const Page = () => {
  const delivered = dataSource.filter((task) => task.status === "Delivered").length;
  const pending = dataSource.length - delivered;

  return (
    <div>
      <PageHeader
        icon={<BarChartOutlined />}
        title="Task Status"
        subtitle="Track delivery progress across all active projects"
        extra={
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Tag color="success">{delivered} delivered</Tag>
            <Tag color="warning">{pending} pending</Tag>
          </div>
        }
      />
      <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 14, overflow: "hidden" }}>
        <ReuseableTable
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 8,
            showSizeChanger: true,
            showTotal: (total) => `${total} tasks`,
            responsive: true,
          }}
        />
      </Card>
    </div>
  );
};

export default Page;