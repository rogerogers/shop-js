import { z } from 'zod';

const formSchema = z
  .object({
    id: z.number().optional(),
    email: z.string().email().min(5).default(''),
    expired_at: z.date().optional(),
    password_authentication: z.boolean().default(false).optional(),
    password: z.string().optional(),
  })
  .refine(
    (val) => {
      if (val.password_authentication && val.password === '') {
        return false;
      }
      return true;
    },
    {
      message: '允许密码登录的时候必须输入密码',
      path: ['password'],
    },
  );

type FormValue = z.infer<typeof formSchema>;

const defaultValues: FormValue = { email: '' };
export { defaultValues, formSchema, type FormValue };
