'use client';

import { Link } from '@rogerogers/i18n/routing';
import { Button } from '@rogerogers/ui/button';
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
    accessorKey: 'id',
    header: () => {
      return <div className="text-center">订单ID</div>;
    },
    cell: ({ row }) => <div className="text-center">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: () => {
      return <div className="text-center">订单名</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'financial_status',
    header: ({ column }) => {
      return <div className="text-center">支付状态</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('financial_status')}</div>
    ),
  },
  {
    accessorKey: 'fulfillment_status',
    header: () => <div className="text-center">履约状态</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.getValue('fulfillment_status')}</div>
      );
    },
  },
  {
    accessorKey: 'presentment_currency',
    header: () => <div className="text-center">支付总额</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {' '}
        {row.getValue('presentment_currency')}{' '}
        {row.original?.total_price_set?.presentment_money?.amount}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => <div className="text-center">操作</div>,
    cell: ({ row }) => (
      <div className="flex justify-center space-x-2">
        <Button>发货</Button>
        <Link href={`/third/orders/${row.getValue('id')}`}>
          <Button>详情</Button>
        </Link>
      </div>
    ),
  },
];
