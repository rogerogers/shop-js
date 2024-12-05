'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormSchema, type TypeFormSchema } from './schema';

import { createAttributeValue } from '@/service/client';
import { Button } from '@rogerogers/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@rogerogers/ui/form';
import { toast } from '@rogerogers/ui/hooks/use-toast';
import { Input } from '@rogerogers/ui/input';

type TypeForm = {
  setLoading: any;
  setOpen: any;
  data?: TypeFormSchema;
};

export const CreateForm: React.FC<TypeForm> = ({
  setLoading,
  setOpen,
  data,
}) => {
  const hasData = typeof data !== 'undefined';
  const form = useForm<TypeFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      attribute_id: data?.attribute_id,
      name_cn: data?.name_cn,
      name_en: data?.name_en,
      is_enabled: data?.is_enabled,
      rank: data?.rank,
    },
  });

  async function onSubmit(data: TypeFormSchema) {
    setLoading(true);
    try {
      const resp = await createAttributeValue(data);
      const respBody = await resp.json();
      if (respBody?.base_resp?.success === true) {
        toast({
          title: hasData ? '更新成功' : '创建成功',
          description: (
            <div>
              <p className="text-sm">{respBody?.message}</p>
            </div>
          ),
        });
        setOpen(false);
      }
    } catch (error) {
      toast({
        title: '发生错误',
        description: (
          <div>
            <p className="text-sm">{(error as Error).toString()}</p>
          </div>
        ),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name_cn"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-x-4">
              <FormLabel className="text-right" htmlFor={field.name}>
                属性名称
              </FormLabel>
              <FormControl className="items-center col-span-3">
                <Input
                  onChange={field.onChange}
                  name={field.name}
                  id={field.name}
                  defaultValue={field.value}
                />
              </FormControl>
              <FormMessage className="col-span-4 text-center" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attribute_id"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-x-4">
              <FormLabel className="text-right" htmlFor={field.name}>
                属性值名
              </FormLabel>
              <FormControl className="items-center grid-cols-3">
                <Input
                  name={field.name}
                  id={field.name}
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit">{hasData ? '更新' : '提交'}</Button>
        </div>
      </form>
    </Form>
  );
};
