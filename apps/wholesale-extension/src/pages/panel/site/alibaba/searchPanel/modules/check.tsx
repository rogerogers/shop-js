'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { CheckType } from '@/types/check';
import { Button } from '@rogerogers/ui/button';
import { Checkbox } from '@rogerogers/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@rogerogers/ui/form';
import { toast } from '@rogerogers/ui/hooks/use-toast';
import { useEffect } from 'react';

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

export function CheckImageList({ images }: { images: CheckType[] }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });
  useEffect(() => {
    form.reset();
  }, [images]);
  const itemsValue = useWatch({ name: 'items', control: form.control });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  const Bar = () => (
    <div className="flex sticky top-0 items-center space-x-4 bg-white pb-4">
      <Button
        type="button"
        onClick={() => {
          if (itemsValue.length === images.length) {
            form.setValue('items', []);
          } else {
            form.setValue(
              'items',
              images.map((item) => item.id),
            );
          }
        }}
        size="sm"
      >
        {itemsValue.length === images.length ? '取消全部' : '选择全部'}
      </Button>
      <div>
        当前选中: {itemsValue.length}/{images.length}
      </div>
      <Button type="submit" size="sm">
        采集
      </Button>
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pb-8">
        <Bar />
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="space-y-0 grid grid-cols-2 gap-4">
              <FormMessage />
              {images.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="space-y-2 font-normal cursor-pointer">
                          <span>{item.title}</span>
                          <img src={item.label} alt="" />
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
