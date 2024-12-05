'use client';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import { DataTableViewOptions } from './column-toggle';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@rogerogers/ui/custom/table';
import { Input } from '@rogerogers/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@rogerogers/ui/pagination';

import { ScrollArea, ScrollBar } from '@rogerogers/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@rogerogers/ui/select';
import { ColumnDef } from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  defaultPagination: PaginationState;
  pageSizeOptions?: number[];
  rowCount: number;
  clientTable?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  rowCount,
  defaultPagination,
  pageSizeOptions = [5, 10, 20, 30, 40, 50],
  clientTable = false,
}: DataTableProps<TData, TValue>) {
  const searchParam = useSearchParams();
  const searchPage = searchParam.get('page');
  const searchPageSize = searchParam.get('page_size');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: searchPage
      ? parseInt(searchPage) - 1
      : defaultPagination.pageIndex,
    pageSize: searchPageSize
      ? parseInt(searchPageSize)
      : defaultPagination.pageSize,
  });
  useEffect(() => {
    setPagination({
      pageIndex: searchPage
        ? parseInt(searchPage) - 1
        : defaultPagination.pageIndex,
      pageSize: searchPageSize
        ? parseInt(searchPageSize)
        : defaultPagination.pageSize,
    });
  }, [defaultPagination, searchPage, searchPageSize]);
  const router = useRouter();
  const pathname = usePathname();

  const tableObj: TableOptions<TData> = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true, //turn off client-side pagination
    rowCount: rowCount,
    state: {
      pagination,
    },
  };
  if (clientTable) {
    tableObj.getPaginationRowModel = getPaginationRowModel();
    tableObj['manualPagination'] = false;
  }
  const table = useReactTable(tableObj);

  const getLink = (page?: number, pageSize?: string | undefined) => {
    const p = new URLSearchParams(searchParam);
    if (page) {
      if (page <= 0) {
        return '/#';
      }
      p.set('page', page.toString());
    }
    if (pageSize) {
      p.set('page_size', pageSize);
    }
    return `${pathname}?` + p.toString();
  };

  const redirect = (
    page?: number | undefined,
    pageSize?: string | undefined,
  ) => {
    router.push(getLink(page, pageSize));
  };

  return (
    <>
      <div className="flex my-1">
        {searchKey && (
          <Input
            placeholder={`Search ${searchKey}...`}
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ''
            }
            name={searchKey}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="w-full md:max-w-sm"
          />
        )}
        <DataTableViewOptions table={table} />
      </div>

      <ScrollArea className="h-full rounded-md border">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={'sticky top-0 bg-secondary [&_tr]:border-b'}
                    >
                      {header.isPlaceholder
                        ? null
                        : (flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          ) as ReactNode)}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="max-w-[220px]">
                      {
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        ) as ReactNode
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length}{' '}
          <span className="hidden lg:inline-block"> row(s) selected.</span>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <p className="whitespace-nowrap text-sm font-medium hidden lg:inline-block">
              Rows per page
            </p>
            <Select
              value={pagination.pageSize.toString()}
              onValueChange={(value) => {
                setPagination({ ...pagination, pageSize: +value });
                redirect(1, value);
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-x-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem className="cursor-pointer">
                <PaginationPrevious
                  size="default"
                  href={getLink(pagination.pageIndex)}
                  className={`${
                    table.getCanPreviousPage()
                      ? 'pointer-events-auto'
                      : 'pointer-events-none'
                  }`}
                ></PaginationPrevious>
              </PaginationItem>
              <PaginationItem className="cursor-pointer">
                <PaginationLink
                  size="default"
                  href={'/#'}
                  className={'pointer-events-none'}
                  isActive
                >
                  {pagination.pageIndex + 1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="cursor-pointer">
                <PaginationNext
                  size="default"
                  href={getLink(pagination.pageIndex + 2)}
                  className={`${
                    table.getCanNextPage()
                      ? 'pointer-events-auto'
                      : 'pointer-events-none'
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}
