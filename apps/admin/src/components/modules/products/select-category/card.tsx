'use client';
import { cn } from '@/lib/utils';
import { Button } from '@rogerogers/ui/button';
import { Card, CardContent } from '@rogerogers/ui/card';
import { ScrollArea } from '@rogerogers/ui/scroll-area';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type CategoryCardItem = {
  category_id: string;
  name: string;
  name_cn: string;
  children?: CategoryCardItem[];
};

export const SelectCategoryCard = ({ data }: { data: any }) => {
  const router = useRouter();
  const defaultEmptyCategory: CategoryCardItem = React.useMemo(
    () => ({
      category_id: '',
      name: '',
      name_cn: '',
    }),
    [],
  );
  const [level1Category, setLevel1Category] =
    useState<CategoryCardItem>(defaultEmptyCategory);
  const [level2Category, setLevel2Category] =
    useState<CategoryCardItem>(defaultEmptyCategory);
  const [level3Category, setLevel3Category] =
    useState<CategoryCardItem>(defaultEmptyCategory);
  const [level4Category, setLevel4Category] =
    useState<CategoryCardItem>(defaultEmptyCategory);
  const [finalSelected, setFinalSelected] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const styleBg = 'bg-accent';

  useEffect(() => {
    setDisabled(true);
    setLevel2Category(defaultEmptyCategory);
    setLevel3Category(defaultEmptyCategory);
    setLevel4Category(defaultEmptyCategory);
  }, [level1Category, defaultEmptyCategory]);

  useEffect(() => {
    if (
      level2Category.category_id !== '' &&
      (typeof level2Category?.children === 'undefined' ||
        level2Category.children.length <= 0)
    ) {
      setFinalSelected(level2Category.category_id);
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setLevel3Category(defaultEmptyCategory);
    setLevel4Category(defaultEmptyCategory);
  }, [level2Category, defaultEmptyCategory]);

  useEffect(() => {
    if (
      level3Category.category_id !== '' &&
      (typeof level3Category?.children === 'undefined' ||
        level3Category?.children?.length <= 0)
    ) {
      setLevel4Category(defaultEmptyCategory);
      setFinalSelected(level3Category.category_id);
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [level3Category, defaultEmptyCategory]);

  useEffect(() => {
    if (level4Category.category_id !== '') {
      setFinalSelected(level4Category.category_id);
      setDisabled(false);
    }
  }, [level4Category]);
  return (
    <>
      <div className="flex flex-row">
        <Card className="basis-1/4 h-full">
          <CardContent className="p-0">
            <ScrollArea className="h-[50vh]">
              <ul
                className={cn('divide-y divide-gray-200 dark:divide-gray-700')}
              >
                {data.map((item: CategoryCardItem) => (
                  <li
                    className={cn(
                      'text-center flex items-center justify-between h-12 cursor-pointer p-2',
                      level1Category?.category_id === item.category_id
                        ? styleBg
                        : '',
                    )}
                    key={item?.category_id}
                    onClick={() => {
                      setLevel1Category(item);
                    }}
                  >
                    <div>{item?.name_cn}</div>
                    <div className="flex justify-around">
                      {typeof item?.children?.length !== 'undefined' &&
                        item?.children?.length > 0 &&
                        (level1Category?.category_id === item.category_id ? (
                          <ChevronDown />
                        ) : (
                          <ChevronRight />
                        ))}
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="basis-1/4 h-full">
          <CardContent className="p-0">
            <ScrollArea className="h-[50vh]">
              <ul
                className={cn('divide-y divide-gray-200 dark:divide-gray-700')}
              >
                {level1Category?.children?.map((item: CategoryCardItem) => (
                  <li
                    className={cn(
                      'text-center flex items-center justify-between h-12 cursor-pointer p-2',
                      level2Category?.category_id === item.category_id
                        ? styleBg
                        : '',
                    )}
                    key={item.category_id}
                    onClick={() => {
                      setLevel2Category(item);
                    }}
                  >
                    <div>{item.name_cn}</div>
                    <div className="flex justify-around">
                      {typeof item?.children?.length !== 'undefined' &&
                        item?.children?.length > 0 &&
                        (level2Category?.category_id === item.category_id ? (
                          <ChevronDown />
                        ) : (
                          <ChevronRight />
                        ))}
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="basis-1/4 h-full">
          <CardContent className="p-0">
            <ScrollArea className="h-[50vh]">
              <ul
                className={cn('divide-y divide-gray-200 dark:divide-gray-700')}
              >
                {level2Category?.children?.map((item: CategoryCardItem) => (
                  <li
                    className={cn(
                      'text-center flex items-center justify-between h-12 cursor-pointer p-2',
                      level3Category?.category_id === item.category_id
                        ? styleBg
                        : '',
                    )}
                    key={item.category_id}
                    onClick={() => {
                      // 设置当前第三级
                      setLevel3Category(item);
                    }}
                  >
                    <div>{item.name_cn}</div>
                    <div className="flex justify-around">
                      {typeof item?.children?.length !== 'undefined' &&
                        item?.children?.length > 0 &&
                        (level3Category?.category_id === item.category_id ? (
                          <ChevronDown />
                        ) : (
                          <ChevronRight />
                        ))}
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="basis-1/4 h-full">
          <CardContent className="p-0">
            <ScrollArea className="h-[50vh]">
              <ul
                className={cn('divide-y divide-gray-200 dark:divide-gray-700')}
              >
                {level3Category?.children?.map((item: CategoryCardItem) => (
                  <li
                    className={cn(
                      'text-center flex items-center justify-center h-12 cursor-pointer p-2',
                      level4Category?.category_id === item.category_id
                        ? styleBg
                        : '',
                    )}
                    key={item.category_id}
                    onClick={() => {
                      setLevel4Category(item);
                    }}
                  >
                    <div>{item.name_cn}</div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center pt-10">
        <Button
          className="w-36"
          disabled={disabled}
          type="button"
          onClick={() => {
            if (disabled) {
              return;
            } else {
              router.push(`/products/create?category_id=${finalSelected}`);
            }
          }}
        >
          下一步
        </Button>
      </div>
    </>
  );
};
