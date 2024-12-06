'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@rogerogers/i18n/routing';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@rogerogers/ui/form';
import { Input } from '@rogerogers/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@rogerogers/ui/select';
import { useSearchParams } from 'next/navigation';
import qs from 'qs';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  title: z.string().optional(),
  status: z.string().optional(),
});

export default function Search({
  children,
}: {
  children: string | JSX.Element;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: searchParams.get('title') ?? undefined,
      status: searchParams.get('status') ?? undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      router.push(
        '/platforms/shopify/products' +
          '?' +
          qs.stringify(Object.assign(Object.fromEntries(searchParams), values)),
      );
    } catch (error) {
      console.error('Form submission error', error);
      // toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-3xl"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" type="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">在售</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-4">{children}</div>
      </form>
    </Form>
  );
}
