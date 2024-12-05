'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@rogerogers/ui/accordion';
import { useToast } from '@rogerogers/ui/hooks/use-toast';
import Link from 'next/link';

export function DataTable({ columns }: any) {
  const { toast } = useToast();

  return (
    <Accordion type="single" collapsible>
      {columns.map((item: any) => {
        return (
          <AccordionItem value={item.id} key={item.id}>
            <AccordionTrigger>
              <div className="w-full pe-5 flex justify-between">
                <div>{item.name}</div>
                <div>
                  {item.children && item.children.length ? '' : '叶子类目'}
                </div>
                <div>
                  <span
                    onClick={(e) => {
                      toast({
                        title: 'abc',
                        description: (
                          <div>
                            <p className="text-sm">def</p>
                          </div>
                        ),
                      });
                      e.preventDefault();
                    }}
                  >
                    <Link href={`/category/${item.id}`}>编辑</Link>
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {item.children && item.children.length > 0
                ? DataTable({ columns: item.children, data: {} })
                : item.name}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
