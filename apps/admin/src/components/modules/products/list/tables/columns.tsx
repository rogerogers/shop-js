'use client';

import { Attribute } from '@/constants/data';
import { Checkbox } from '@rogerogers/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@rogerogers/ui/button';

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
    accessorKey: 'attribute_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Attribute Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('attribute_name')}</div>
    ),
  },
  {
    accessorKey: 'visible_in_storefront',
    header: () => <div className="text-right">{'Visible In Storefront'}</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue('visible_in_storefront') ? '是' : '否'}
        </div>
      );
    },
  },
  {
    accessorKey: 'filterable_in_dashboard',
    header: () => <div className="text-right">Filterable In Storefront</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue('filterable_in_dashboard') ? '是' : '否'}
        </div>
      );
    },
  },
  {
    accessorKey: 'filterable_in_storefront',
    header: () => <div className="text-right">前端筛选</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue('filterable_in_storefront') ? '是' : '否'}
        </div>
      );
    },
  },
  {
    accessorKey: 'storefront_search_position',
    header: () => <div className="text-right">Storefront Search Position</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue('storefront_search_position')}
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
        <div className="flex flex-col lg:min-w-20 cursor-pointer space-y-2">
          <Link href={`/attributes/${row.getValue('attribute_id')}`}>
            查看属性值
          </Link>
        </div>
      );
    },
  },
];
