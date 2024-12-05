'use client';

import { TypographyH1 } from '@/components/custom/typography';
import Upload, { UploadType } from '@/components/custom/upload';
import { uploadFile } from '@/lib/aliyun';
import repeat from '@/lib/repeat';
import { cartesianProduct, isProduction } from '@/lib/utils';
import { useAliyunStsState } from '@/stores/data-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { NextImage } from '@rogerogers/next-common/custom/next-image';
import { Button } from '@rogerogers/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';
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
import { Plus } from 'lucide-react';
import { ChangeEvent, useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { useStore } from 'zustand';
import AttributeSelect from './attr-select';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  image: z.string({ message: 'image must be set' }),
  name_cn: z.string().min(2, {
    message: 'Cn name must be at least 2 characters.',
  }),
  category_id: z.string().min(1, {
    message: 'Category must be set.',
  }),
  brand: z.string().min(2, {
    message: 'Brand must be set.',
  }),
  video: z.any(),
  attributes: z.array(z.string().optional()).optional(),
  specific: z.array(z.array(z.string())).min(1, 'spec must be set'),
  hiddenvideo: z.any().array(),
  sku: z.array(z.any().optional()).optional(),
});

export default function ClientWarp({
  category_detail,
  category_id,
  categoryAttributes,
}: {
  category_detail?: Array<any>;
  category_id: string;
  categoryAttributes: any;
}) {
  const aliyunSts = useStore(useAliyunStsState, (state) => state.aliyunSts);
  useEffect(() => {
    if (isProduction()) {
      window.addEventListener('beforeunload', alertUser);
      window.addEventListener('unload', handleTabClosing);
      return () => {
        window.removeEventListener('beforeunload', alertUser);
        window.removeEventListener('unload', handleTabClosing);
      };
    }
  });

  const handleTabClosing = () => {
    confirm('Are you sure?');
  };

  const alertUser = (event: any) => {
    event.preventDefault();
    event.returnValue = '';
  };

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'abc',
      name_cn: 'abc',
      category_id: category_id,
      brand: 'abc',
      video: null,
      hiddenvideo: [],
    },
  });
  const watchSpecific = useWatch({ name: 'specific', control: form.control });
  const watchSku = useWatch({ name: 'sku', control: form.control });

  useEffect(() => {
    if (
      watchSpecific?.every((i) => {
        return typeof i !== 'undefined' && i.length > 0;
      })
    ) {
      form.setValue('sku', cartesianProduct(...watchSpecific));
    }
  }, [form, watchSpecific]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    toast({
      title: 'hello',
      description: (
        <pre>
          <code className="h-20">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }
  const category_path = useMemo(() => {
    return category_detail
      ?.map((item: any) => {
        return item.name_cn;
      })
      .join(' > ');
  }, [category_detail]);

  const spec = useMemo(() => {
    return categoryAttributes?.attribute?.filter((item: any) => {
      return item.type === 2;
    });
  }, [categoryAttributes]);

  const attrValueMap = useMemo(() => {
    return categoryAttributes?.attribute?.reduce((acc: any, item: any) => {
      item.values.forEach((value: any) => {
        acc[value.value_id] = value.name_cn;
      });
      return acc;
    }, {});
  }, [categoryAttributes]);

  return (
    <>
      <TypographyH1 className="py-6">新建商品</TypographyH1>

      <div className="flex min-w-full space-x-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 md:max-w-[60%] pb-32 basis-3/5"
          >
            <div>
              <span className="font-medium">当前类目: </span>
              {category_path}
            </div>
            <FormField
              control={form.control}
              name={'category_id'}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={'category_id'} type="hidden" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'商品名称'}</FormLabel>
                  <FormControl>
                    <Input placeholder={'name'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'name_cn'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'商品中文名称'}</FormLabel>
                  <FormControl>
                    <Input placeholder={'name_cn'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'brand'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'品牌'}</FormLabel>
                  <FormControl>
                    <Input placeholder={'brand'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'video'}
              render={({ field }) => (
                <Upload
                  uploadType={UploadType.Video}
                  label="商品视频"
                  onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                    const result = await uploadFile(
                      event.target.files,
                      aliyunSts,
                    );
                    if (result) {
                      field.onChange(result);
                      return result;
                    }
                  }}
                />
              )}
            />
            <FormField
              control={form.control}
              name={'image'}
              render={({ field }) => (
                <FormItem className="max-w-24">
                  <FormLabel>
                    商品主图
                    <br />
                    <br />
                    <div className="flex items-center h-28 w-24 bg-accent relative rounded-md">
                      <div className="mx-auto">
                        {field.value ? (
                          <NextImage src={field.value} />
                        ) : (
                          '图片上传'
                        )}
                      </div>
                      <div className="h-4 absolute bottom-0 text-center w-full rounded-b-md bg-gray-400">
                        首图
                      </div>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="hidden"
                      placeholder={'image'}
                      type="file"
                      onChange={async (event) => {
                        const allFiles = event?.target?.files;
                        const result = await uploadFile(allFiles, aliyunSts);
                        if (result) {
                          field.onChange(result);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {spec?.map((item: any, index: number) => {
              return (
                <Card className="bordered" key={item.attribute_id}>
                  <CardHeader>
                    <CardTitle>{item.name_cn}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <FormField
                      control={form.control}
                      name={`specific.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{item.name_cn}</FormLabel>
                          <FormControl>
                            <AttributeSelect
                              maxCount={5}
                              attribute_id={item.attribute_id}
                              values={item.values}
                              label={item.name_cn}
                              checkType={item.check_type}
                              onChange={(e: any) => {
                                field.onChange(e);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {item.feature === 1 && (
                      <div className="flex space-x-2">
                        {repeat(5).map((item, index: number) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name={`hiddenvideo.${index}`}
                            render={({ field }) => (
                              <FormItem className="max-w-24">
                                <FormLabel>
                                  <div className="flex items-center h-28 w-24 bg-accent relative rounded-md">
                                    <div className="mx-auto">图片上传</div>
                                    <div className="h-4 absolute bottom-0 text-center w-full rounded-b-md bg-gray-400">
                                      首图
                                    </div>
                                  </div>
                                </FormLabel>
                                <FormControl className="hidden">
                                  <Input
                                    placeholder={'hiddenvideo'}
                                    type="file"
                                    onChange={(event) => {
                                      field.onChange(
                                        event.target.files &&
                                          event.target.files[0],
                                      );
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button type="button">
                      <Plus /> 添加
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
            <Card className="p-2">
              <CardHeader>
                <CardTitle>Sku属性</CardTitle>
              </CardHeader>
              <ul className="list-none space-y-4">
                {watchSku?.map((i) => {
                  return (
                    <li key={i} className="flex">
                      <FormField
                        control={form.control}
                        name={`sku.${i}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{'商品属性'}</FormLabel>
                            <FormControl>
                              <Input placeholder={'video'} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`sku.${i}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{'价格'}</FormLabel>
                            <FormControl>
                              <Input placeholder={'video'} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`sku.${i}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{'库存'}</FormLabel>
                            <FormControl>
                              <Input placeholder={'video'} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`sku.${i}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{'重量'}</FormLabel>
                            <FormControl>
                              <Input placeholder={'video'} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`sku.${i}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{'货号'}</FormLabel>
                            <FormControl>
                              <Input placeholder={'video'} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </li>
                  );
                })}
              </ul>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>商品属性</CardTitle>
              </CardHeader>
              <CardContent className="min-h-24">
                <div className="grid grid-cols-3 gap-4">
                  {categoryAttributes.attribute.map(
                    (item: any, index: number) => (
                      <FormField
                        key={item.attribute_id}
                        control={form.control}
                        name={`attributes.${index}`}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>{item.name_cn}</FormLabel>
                              <FormControl>
                                <AttributeSelect
                                  attribute_id={item.attribute_id}
                                  values={item.values}
                                  label={item.name_cn}
                                  checkType={item.check_type}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="fixed bottom-2">
              Submit
            </Button>
          </form>
        </Form>
        <div className="basis-2/5 max-w-[40%]">
          <Card className="sticky top-10">
            <CardHeader>
              <CardTitle>preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <NextImage
                src="https://img.ltwebstatic.com/images3_pi/2023/03/05/16780290301fddb874be546f8a481d9eeeed2f3e9e_thumbnail_405x552.jpg"
                className="h-[400px] w-auto"
              />
              {watchSpecific?.map((i, index) => {
                return (
                  <div key={index} className="grid grid-cols-3 gap-2">
                    {i?.map((j: any) => {
                      return <div key={j}>{attrValueMap[j]}</div>;
                    })}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
