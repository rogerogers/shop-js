'use client';

import { Checkbox } from '@rogerogers/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import Modal from './modal';
import { FormValue } from './schema';

export const columns: ColumnDef<FormValue>[] = [
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
    accessorKey: 'email',
    header: () => {
      return <div className="text-center">邮件</div>;
    },
    cell: ({ row }) => (
      <div className="w-full text-center">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'expired_at',
    header: () => {
      return <div className="text-center">过期时间</div>;
    },
    cell: ({ row }) => (
      <div className="w-full text-center">{row.getValue('expired_at')}</div>
    ),
  },
  {
    accessorKey: 'created_at',
    header: () => {
      return <div className="text-center">创建时间</div>;
    },
    cell: ({ row }) => (
      <div className="w-full text-center">{row.getValue('created_at')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => <div className="text-center">操作</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Modal
            email={row.getValue('email')}
            password_authentication={row.original.password_authentication}
            id={row.original.id}
            expired_at={row.original.expired_at}
          />
        </div>
      );
    },
  },
];
