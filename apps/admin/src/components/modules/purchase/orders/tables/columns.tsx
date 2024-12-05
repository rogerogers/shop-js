'use client';

import { Checkbox } from '@rogerogers/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<any>[] = [
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
    accessorKey: 'fullName',
    header: () => {
      return <div className="text-center">收件人</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('fullName')}</div>
    ),
  },
  {
    accessorKey: 'address',
    header: ({ column }) => {
      return <div className="text-center">地址</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('address')}</div>
    ),
  },
  {
    accessorKey: 'post',
    header: () => <div className="text-center">邮编</div>,
    cell: ({ row }) => row.getValue('post'),
  },
  {
    accessorKey: 'mobilePhone',
    header: () => <div className="text-center">手机号</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('mobilePhone')}</div>
    ),
  },
  {
    accessorKey: 'addressCode',
    header: () => <div className="text-center">地址号</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('addressCode')}</div>
    ),
  },
  {
    accessorKey: 'addressCodeText',
    header: () => <div className="text-center">地址</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('addressCodeText')}</div>
    ),
  },
  {
    accessorKey: 'isDefault',
    header: () => <div className="text-center">默认</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {row.original.isDefault ? '是' : '否'}
        </div>
      );
    },
  },
];
