'use client';

import { SalesChannel } from '@/constants/data';
import { Checkbox } from '@rogerogers/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

import UpdateDialog from './update-dialog';

export const columns: ColumnDef<SalesChannel>[] = [
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
    accessorKey: 'name',
    header: '名称',
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return <div className="max-w-72">描述</div>;
    },
    cell: ({ row }) => <div>{row.getValue('description')}</div>,
  },
  {
    accessorKey: 'is_enabled',
    header: ({ column }) => {
      return <div>状态</div>;
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {row.getValue('is_enabled') === true ? '启用' : '禁用'}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => <div className="text-center">操作</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col lg:min-w-20 cursor-pointer space-y-2 items-center">
          <UpdateDialog data={row.original} />
        </div>
      );
    },
  },
];
