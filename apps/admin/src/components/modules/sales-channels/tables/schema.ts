import { z } from 'zod';

export const FormSchema = z.object({
  id: z.number().optional(),
  description: z.string().optional(),
  name: z.string().min(2, {
    message: '名称必须两个字以上',
  }),
  is_enabled: z.boolean(),
});

export type TypeFormSchema = z.infer<typeof FormSchema>;
