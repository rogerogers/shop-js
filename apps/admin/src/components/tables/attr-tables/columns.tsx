'use client';

import { Attribute } from '@/constants/data';
import { Checkbox } from '@rogerogers/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import UpdateDialog from './update-dialog';

enum AttrType {
  IMPORTANT = '重要属性',
  SALE = '销售属性',
  NORMAL = '普通属性',
}

const convertType = (type: number) => {
  switch (type) {
    case 1:
      return AttrType.IMPORTANT;
    case 2:
      return AttrType.SALE;
    case 3:
      return AttrType.NORMAL;
    default:
      return '';
  }
};

export const columns: ColumnDef<Attribute>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'attribute_id',
    header: 'attribute_id',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('attribute_id')}</div>
    ),
  },
  {
    accessorKey: 'name_cn',
    header: ({ column }) => {
      return <div className="max-w-72">中文名称</div>;
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('name_cn')}</div>
    ),
  },
  {
    accessorKey: 'name_en',
    header: ({ column }) => {
      return <div>英文名称</div>;
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('name_en')}</div>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return <div>类型</div>;
    },
    cell: ({ row }) => (
      <div className="lowercase">{convertType(row.getValue('type'))}</div>
    ),
  },
  {
    accessorKey: 'rank',
    header: ({ column }) => {
      return <div>排序值</div>;
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('rank')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => <div className="text-center">操作</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col lg:min-w-20 cursor-pointer space-y-2">
          <UpdateDialog data={row.original} />
          <Link href={`/attributes/${row.getValue('attribute_id')}`}>
            查看属性值
          </Link>
        </div>
      );
    },
  },
];
