'use client';

import { createSalesChannel, updateSalesChannel } from '@/service/client';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Switch } from '@rogerogers/ui/switch';
import { useForm } from 'react-hook-form';
import { FormSchema, type TypeFormSchema } from './schema';

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
      id: data?.id,
      name: data?.name,
      description: data?.description,
      is_enabled: hasData ? data.is_enabled : true,
    },
  });

  async function onSubmit(data: TypeFormSchema) {
    setLoading(true);
    try {
      let resp = null;
      if (data.id) {
        resp = await updateSalesChannel(data.id, data);
      } else {
        resp = await createSalesChannel(data);
      }
      if (resp?.base_resp?.success === true) {
        toast({
          title: hasData ? '更新成功' : '创建成功',
          description: (
            <div>
              <p className="text-sm">{resp?.message}</p>
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
          name="name"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-x-4">
              <FormLabel className="text-right" htmlFor={field.name}>
                名称
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
          name="description"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-x-4">
              <FormLabel className="text-right" htmlFor={field.name}>
                描述
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
          name="is_enabled"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-x-4">
              <FormLabel className="text-right" htmlFor={field.name}>
                是否启用
              </FormLabel>
              <FormControl className="items-center grid-cols-3">
                <Switch
                  name={field.name}
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
