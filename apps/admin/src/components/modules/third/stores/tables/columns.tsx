'use client';

import { Store } from '@/constants/data';
import { Button } from '@rogerogers/ui/button';
import { Checkbox } from '@rogerogers/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Store>[] = [
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
    header: () => {
      return <div className="text-center">店铺名</div>;
    },
    cell: ({ row }) => <span>{row.getValue('name')}</span>,
  },
  {
    accessorKey: 'store_url',
    header: ({ column }) => {
      return <div className="text-center">店铺链接</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue('store_url')}
        {typeof row.original?.store_url !== 'undefined' &&
          row.original?.store_url !== '' && (
            <a
              rel="noopener"
              target="_blank"
              href={`https://${row.getValue('store_url')}`}
              className="pl-2 text-blue-600"
            >
              访问
            </a>
          )}
      </div>
    ),
  },
  {
    accessorKey: 'app',
    header: () => <div className="text-center">{'关联应用'}</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.original?.application?.name}
        </div>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: () => <div className="text-center">创建时间</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue('created_at')}
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
          <Button>编辑</Button>
        </div>
      );
    },
  },
];
