import React from "react";
import { Empty, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TablePaginationConfig } from "antd";

type TableProps<T> = {
  dataSource: T[];
  columns: ColumnsType<T>;
  loading?: boolean;
  rowKey?: string;
  pagination?: false | TablePaginationConfig;
};

const DEFAULT_PAGINATION: TablePaginationConfig = {
  pageSize: 8,
  showSizeChanger: true,
  showTotal: (total) => `${total} records`,
  responsive: true,
};

const ReuseableTable = <T extends object>({
  columns,
  dataSource,
  loading = false,
  rowKey = "key",
  pagination = DEFAULT_PAGINATION,
}: TableProps<T>) => (
  <Table<T>
    rowKey={rowKey}
    columns={columns}
    dataSource={dataSource}
    loading={loading}
    pagination={pagination}
    scroll={{ x: "max-content" }}
    locale={{
      emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No data found" />,
    }}
  />
);

export default ReuseableTable;