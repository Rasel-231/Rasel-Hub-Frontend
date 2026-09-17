"use client";

import ReuseableTable from "@/app/Components/ReuseableTable";
import PageHeader from "@/app/Components/PageHeader";
import { Card, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DollarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

interface Payment {
  key: string;
  si: number;
  wallet: string;
  platform: string;
  budget: number;
  status: "Paid" | "Partial" | "Unpaid";
  createdAt: string;
}

const statusColor: Record<string, string> = {
  Paid: "success",
  Partial: "processing",
  Unpaid: "error",
};

const walletColor: Record<string, string> = {
  Bkash: "magenta",
  Nagad: "orange",
  Rocket: "purple",
  Crypto: "gold",
};

const columns: ColumnsType<Payment> = [
  { title: "SI", dataIndex: "si", width: 70, align: "center" },
  {
    title: "Wallet",
    dataIndex: "wallet",
    render: (v: string) => <Tag color={walletColor[v] ?? "default"}>{v}</Tag>,
  },
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
    render: (status: string) => <Tag color={statusColor[status] ?? "default"}>{status}</Tag>,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    render: (data: string) => (data ? dayjs(data).format("MMM D, YYYY hh:mm A") : "-"),
  },
];

const dataSource: Payment[] = [
  { key: "1", si: 1, wallet: "Bkash", platform: "Facebook Promote", budget: 5000, status: "Paid", createdAt: "2023-01-15T10:30:00" },
  { key: "2", si: 2, wallet: "Rocket", platform: "Youtube Promote", budget: 8000, status: "Unpaid", createdAt: "2023-02-20T14:45:00" },
  { key: "3", si: 3, wallet: "Nagad", platform: "Website Development and Design", budget: 15000, status: "Partial", createdAt: "2023-03-05T09:15:00" },
  { key: "4", si: 4, wallet: "Crypto", platform: "Data Entry Clerk", budget: 9000, status: "Paid", createdAt: "2024-04-12T11:00:00" },
  { key: "5", si: 5, wallet: "Bkash", platform: "Facebook Promote", budget: 4500, status: "Unpaid", createdAt: "2024-05-18T16:20:00" },
  { key: "6", si: 6, wallet: "Rocket", platform: "Youtube Promote", budget: 7000, status: "Partial", createdAt: "2025-06-25T13:10:00" },
  { key: "7", si: 7, wallet: "Nagad", platform: "Website Development and Design", budget: 14000, status: "Paid", createdAt: "2025-07-08T08:50:00" },
  { key: "8", si: 8, wallet: "Crypto", platform: "Data Entry Clerk", budget: 9500, status: "Partial", createdAt: "2025-08-14T15:30:00" },
  { key: "9", si: 9, wallet: "Bkash", platform: "Facebook Promote", budget: 4500, status: "Paid", createdAt: "2024-09-21T12:00:00" },
  { key: "10", si: 10, wallet: "Rocket", platform: "Youtube Promote", budget: 7500, status: "Unpaid", createdAt: "2024-10-30T17:45:00" },
  { key: "11", si: 11, wallet: "Nagad", platform: "Website Development and Design", budget: 16500, status: "Paid", createdAt: "2024-11-11T09:35:00" },
  { key: "12", si: 12, wallet: "Crypto", platform: "Data Entry Clerk", budget: 7500, status: "Partial", createdAt: "2025-01-19T14:25:00" },
];

const Page = () => {
  const total = dataSource.reduce((sum, item) => sum + item.budget, 0);

  return (
    <div>
      <PageHeader
        icon={<DollarOutlined />}
        title="Payments"
        subtitle="Wallet transactions and settlement history"
        extra={<Tag color="geekblue">Total ৳ {total.toLocaleString("en-US")}</Tag>}
      />
      <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 14, overflow: "hidden" }}>
        <ReuseableTable
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 8,
            showSizeChanger: true,
            showTotal: (records) => `${records} transactions`,
            responsive: true,
          }}
        />
      </Card>
    </div>
  );
};

export default Page;