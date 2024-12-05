import { columns } from './columns';
import { DataTable } from './data-table';
export default async function Category() {
  return (
    <div className="py-10">
      <DataTable columns={columns} />
    </div>
  );
}
