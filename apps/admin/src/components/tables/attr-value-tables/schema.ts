import { z } from 'zod';

export const FormSchema = z.object({
  attribute_id: z.string(),
  is_enabled: z.boolean(),
  name_cn: z.string().min(2),
  name_en: z.string().min(2),
  rank: z.number().min(0),
});

export type TypeFormSchema = z.infer<typeof FormSchema>;
