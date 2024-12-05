// @ts-nocheck
'use client';

import { AttrValueClient } from '@/components/tables/attr-value-tables/client';
import { Card, CardContent, CardHeader, CardTitle } from '@rogerogers/ui/card';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

const columns = [];

export default function ClientWarp({ data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, //initial page index
    pageSize: 20, //default page size
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>属性信息</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data.name_cn}</p>
        </CardContent>
      </Card>
      <AttrValueClient data={data?.values} rowCount={data?.values?.length} />
    </>
  );
}
