'use client';

import { Checkbox } from '@rogerogers/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

import { Platform } from '@/constants/data';
import { NextImage } from '@rogerogers/next-common/custom/next-image';
import { Button } from '@rogerogers/ui/button';

export const columns: ColumnDef<Platform>[] = [
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
    accessorKey: 'id',
    header: () => {
      return <div className="text-center">应用ID</div>;
    },
    cell: ({ row }) => <div className="text-center">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <div className="text-center">应用名称</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'platform',
    enableResizing: false, //disable resizing for just this column
    size: 200, //starting column size
    maxSize: 100,
    header: ({ column }) => {
      return <div className="text-center">平台名称</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.original.platform.name}</div>;
    },
  },
  {
    accessorKey: 'logo',
    header: () => <div className="text-center max-w-[220px]">{'logo'}</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center max-w-[220px]">
          <NextImage src={row.original.platform.logo} />
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => <div className="text-center">操作</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Button type="button">编辑</Button>
        </div>
      );
    },
  },
];
