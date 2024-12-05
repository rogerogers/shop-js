'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormSchema, type TypeFormSchema } from './schema';

import { createAttribute } from '@/service/client';
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
      attribute_name: data?.attribute_name,
      visible_in_storefront: data?.visible_in_storefront ?? true,
      filterable_in_storefront: data?.filterable_in_storefront ?? false,
      filterable_in_dashboard: data?.filterable_in_dashboard ?? false,
      storefront_search_position: data?.storefront_search_position ?? 0,
    },
  });

  async function onSubmit(data: TypeFormSchema) {
    setLoading(true);
    try {
      const resp = await createAttribute(data);
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
          name="attribute_name"
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
          name="visible_in_storefront"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-x-4">
              <FormLabel className="text-right" htmlFor={field.name}>
                前端展示
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
        <FormField
          control={form.control}
          name="filterable_in_storefront"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-x-4">
              <FormLabel className="text-right" htmlFor={field.name}>
                前端过滤
              </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  name={field.name}
                  id={field.name}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="filterable_in_dashboard"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-x-4">
              <FormLabel className="text-right" htmlFor={field.name}>
                后端过滤
              </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  name={field.name}
                  id={field.name}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="storefront_search_position"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-x-4">
              <FormLabel className="text-right" htmlFor={field.name}>
                前端位置
              </FormLabel>
              <FormControl className="col-span-3">
                <Input
                  placeholder="0"
                  type="number"
                  min={0}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  name={field.name}
                  id={field.name}
                />
              </FormControl>
              <FormMessage className="col-span-4 text-center" />
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
