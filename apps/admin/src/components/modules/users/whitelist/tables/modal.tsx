'use client';

import { addAuthWhitelistAction } from '@/app/actions';
import { DatePicker } from '@/components/custom/date-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/custom/dialog';
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
import { useToast } from '@rogerogers/ui/hooks/use-toast';
import { Input } from '@rogerogers/ui/input';
import { Switch } from '@rogerogers/ui/switch';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { formSchema, type FormValue } from './schema';

const Modal: React.FC<FormValue> = ({
  id,
  email,
  expired_at,
  password,
  password_authentication,
}) => {
  const t = useTranslations('Login');
  const defaultValues = {
    email: email,
    expired_at: expired_at,
    password_authentication: password_authentication,
    password: '',
  };

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const passwordAuthentication = useWatch({
    name: 'password_authentication',
    control: form.control,
  });
  const onSubmit = async (data: FormValue) => {
    const res = await addAuthWhitelistAction({
      email: data.email,
      expired_at: data.expired_at
        ? dayjs(data.expired_at).toString()
        : undefined,
      password_authentication: data.password_authentication,
      password: data.password,
    });

    if (!res.success) {
      toast({
        title: 'error',
        variant: 'destructive',
        description: res.message,
      });
    } else {
      form.reset();
      setOpen(false);
    }

    setLoading(false);
  };
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          {typeof id === 'undefined' ? '添加' : '编辑'}
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e: any) => {
          e.preventDefault();
        }}
        closeAction={() => {
          setOpen(false);
        }}
      >
        <DialogHeader>
          <DialogTitle>邮箱白名单</DialogTitle>
          <DialogDescription>添加登录邮箱白名单</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('enterEmail')}
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expired_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>过期时间</FormLabel>
                  <FormControl>
                    <DatePicker date={field.value} setDate={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_authentication"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="mt-2">密码登录：</FormLabel>
                  <Switch
                    className="space-y-0"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            {passwordAuthentication && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-0.5">
                      <FormLabel>密码：</FormLabel>
                    </div>
                    <Input type="password" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button
              disabled={loading}
              className="ml-auto mt-4 w-full"
              type="submit"
            >
              保存
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
