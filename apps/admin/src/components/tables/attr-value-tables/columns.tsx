'use client';

import { AttributeValue } from '@/constants/data';
import { Checkbox } from '@rogerogers/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

import UpdateDialog from './update-dialog';

export const columns: ColumnDef<AttributeValue>[] = [
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
    header: 'name_cn',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('name_cn')}</div>
    ),
  },
  {
    accessorKey: 'name_en',
    header: 'name_en',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('name_en')}</div>
    ),
  },
  {
    accessorKey: 'rank',
    header: 'rank',
    cell: ({ row }) => <div className="capitalize">{row.getValue('rank')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => <div className="text-center">操作</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col lg:min-w-20 cursor-pointer space-y-2 text-center">
          <UpdateDialog data={row.original} />
        </div>
      );
    },
  },
];
