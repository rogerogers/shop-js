import { z } from 'zod';

export const FormSchema = z.object({
  attribute_id: z.string(),
  attribute_name: z.string().min(2, {
    message: '属性名称 must be at least 2 characters.',
  }),
  visible_in_storefront: z.boolean(),
  filterable_in_storefront: z.boolean(),
  filterable_in_dashboard: z.boolean(),
  storefront_search_position: z.number().min(0, {
    message: 'Storefront search position must be at least 0.',
  }),
});

export type TypeFormSchema = z.infer<typeof FormSchema>;
