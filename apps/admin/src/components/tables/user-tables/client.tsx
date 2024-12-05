'use client';
import { DataTable } from '@/components/custom/data-table';
import { Heading } from '@/components/custom/heading';
import { User } from '@/constants/data';
import { Button } from '@rogerogers/ui/button';
import { Separator } from '@rogerogers/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

interface ProductsClientProps {
  data: User[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        rowCount={10}
        searchKey="name"
        columns={columns}
        data={data}
        defaultPagination={{ pageIndex: 0, pageSize: 20 }}
      />
    </>
  );
};
