'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@rogerogers/ui/accordion';
import { useToast } from '@rogerogers/ui/hooks/use-toast';

export function DataTable({ columns, level }: any) {
  const { toast } = useToast();

  return (
    <Accordion type="single" collapsible>
      {columns.map((item: any) => {
        return (
          <AccordionItem
            value={item.category_id}
            key={item.category_id}
            className={`pl-8`}
          >
            <AccordionTrigger className="hover:bg-accent hover:indent-4 rounded-xl">
              <div className="w-full pe-5 flex justify-between">
                <div>{item.name_cn}</div>
                <div className="flex space-x-6">
                  <div>
                    {item.children && item.children.length ? '' : '叶子类目'}
                  </div>
                  {/* <Link href={`/category/${item.id}`}>编辑</Link> */}
                  <div>编辑</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {item.children && item.children.length > 0 ? (
                <DataTable columns={item.children} level={level + 1} />
              ) : (
                <div className={`pl-${(level - 1) * 8}`}>{item.name_cn}</div>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
