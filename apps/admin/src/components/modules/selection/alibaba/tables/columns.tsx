'use client';

import { Link } from '@rogerogers/i18n/routing';
import { NextImage } from '@rogerogers/next-common/custom/next-image';
import { Button, buttonVariants } from '@rogerogers/ui/button';
import { Checkbox } from '@rogerogers/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { Modal } from './modal/modal';
import { RepurchaseRateModal } from './modal/RepurchaseRate/modal';
import { SellPerDayModal } from './modal/sellPerDay/modal';

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
    accessorKey: 'imageUrl',
    header: () => {
      return <div className="text-center">商品图</div>;
    },
    cell: ({ row }) => (
      <NextImage
        src={row.getValue('imageUrl')}
        className="w-full h-full max-w-[200px] min-w-[100px]"
      />
    ),
  },
  {
    accessorKey: 'subject',
    header: ({ column }) => {
      return <div className="text-center">标题</div>;
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('subject')}</div>
    ),
  },
  {
    accessorKey: 'offerId',
    header: () => <div className="text-center">{'offerId'}</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue('offerId')}</div>
      );
    },
  },
  {
    accessorKey: 'monthSold',
    header: () => <div className="text-center">月销量</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue('monthSold')}
        </div>
      );
    },
  },
  {
    accessorKey: 'minOrderQuantity',
    header: () => <div className="text-center">最小采购</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue('minOrderQuantity')}
        </div>
      );
    },
  },
  {
    accessorKey: 'createDate',
    header: () => <div className="text-center">创建时间</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue('createDate')}
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
          <Modal offerId={row.original.offerId} />
          <Link
            className={buttonVariants({ variant: 'default' })}
            type="button"
            href={`/selection/alibaba/goods/${row.original.offerId}`}
          >
            编辑
          </Link>

          <SellPerDayModal offerId={row.original.offerId} />
          <RepurchaseRateModal offerId={row.original.offerId} />
          <Button>认领</Button>
        </div>
      );
    },
  },
];
