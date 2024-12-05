'use client';
import Settings from '@/config';
import { SignInError } from '@auth/core/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile } from '@marsidev/react-turnstile';
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
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FeishuInButton from '../modules/sign-in/feishu-auth-button';
import GithubSignInButton from '../modules/sign-in/github-auth-button';

const formSchema = z.object({
  email: z.string({ message: 'Enter your work email' }).email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm({
  redirectPath,
}: {
  redirectPath: string;
}) {
  const { toast } = useToast();
  const t = useTranslations('Login');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const defaultValues = {
    email: '',
    password: '',
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const router = useRouter();

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          toast({
            variant: 'destructive',
            title: 'auth failed',
            description: 'auth failed',
          });
          setLoading(false);
        } else {
          router.push(redirectPath);
        }
      })
      .catch((err) => {
        let message = 'unknown error';
        if (err instanceof SignInError) {
          message = 'auth failed';
        }
        toast({
          variant: 'destructive',
          title: 'error',
          description: message,
        });
      });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t('enterPassword')}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-2">
            <Turnstile
              options={{
                theme: 'light',
              }}
              siteKey={Settings.turnstile?.siteKey}
              onSuccess={(token) => {
                console.log(token);
                setVerified(true);
              }}
            />
          </div>

          <Button
            disabled={loading || !verified}
            className="ml-auto w-full"
            type="submit"
          >
            Signin
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <GithubSignInButton />
        <FeishuInButton />
      </div>
    </>
  );
}
