'use client';

import { Link } from '@rogerogers/i18n/routing';
import { NextImage } from '@rogerogers/next-common/custom/next-image';
import type { ShopifyProduct } from '@rogerogers/platform-shopify';
import { Button } from '@rogerogers/ui/button';
import { Checkbox } from '@rogerogers/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ShopifyProduct>[] = [
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
    accessorKey: 'image_url',
    header: () => {
      return <div className="text-center">商品图</div>;
    },
    cell: ({ row }) => (
      <>
        <NextImage
          src={
            row.getValue('image_url') !== ''
              ? row.getValue('image_url')
              : '/assets/buy.png'
          }
          className="w-full h-full max-w-[200px] min-w-[100px]"
          alt="product image"
        />
      </>
    ),
  },
  {
    accessorKey: 'title',
    header: () => {
      return <div className="text-center">标题</div>;
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">{row.getValue('title')}</div>
    ),
  },
  {
    accessorKey: 'handle',
    header: () => <div className="text-center">{'handle'}</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue('handle')}</div>
      );
    },
  },
  {
    accessorKey: 'media_count',
    header: () => <div className="text-center">图片数量</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue('media_count')}
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
        <div className="flex flex-col lg:min-w-20 cursor-pointer space-y-2 items-center">
          <Link href={`/platforms/shopify/products/${row.original.id}`}>
            <Button>编辑</Button>
          </Link>
        </div>
      );
    },
  },
];
