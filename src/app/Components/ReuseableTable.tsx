import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';


type TableProps<T> = {
  dataSource: T[];
  columns: ColumnsType<T>;
};





const ReuseableTable  = <T,>({columns,dataSource}: TableProps<T>) => 
<Table
    columns={columns}
    dataSource={dataSource} />;

export default ReuseableTable;