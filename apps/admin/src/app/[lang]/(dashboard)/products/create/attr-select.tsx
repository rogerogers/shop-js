import { isProduction } from '@/lib/utils';
import { Input } from '@rogerogers/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@rogerogers/ui/select';
import { useMemo, useState } from 'react';

import { MultiSelect } from '@/components/custom/select';

export default function AttributeSelect({
  values,
  onChange,
  label,
  attribute_id,
  checkType,
  maxCount = 1,
}: {
  values: any[];
  onChange: any;
  label: string;
  attribute_id: string;
  checkType: number;
  maxCount?: number;
}) {
  const [v, setV] = useState<string[]>([]);
  const simpleValues = useMemo(() => {
    return values.map((item) => {
      return {
        value: item.value_id,
        label: item.name_cn,
      };
    });
  }, [values]);
  if (values.length === 0) {
    return (
      <Input
        placeholder={label}
        onChange={(e) => {
          const value = e.currentTarget.value;
          onChange(
            JSON.stringify({ attribute_id: attribute_id, values: [value] }),
          );
        }}
      />
    );
  }
  if (checkType === 2) {
    return (
      <MultiSelect
        defaultValue={v}
        options={simpleValues}
        onValueChange={(e: any) => {
          setV(e);
          onChange(e);
        }}
        placeholder={label}
        variant="inverted"
        maxCount={maxCount}
      />
    );
  }
  return (
    <Select
      onValueChange={(e) => {
        onChange(JSON.stringify({ attribute_id: attribute_id, values: [e] }));
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="w-full">
        {values.length > 0 &&
          simpleValues.map((item, index) => {
            if (index > 100 && !isProduction()) {
              return;
            }
            return (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            );
          })}
      </SelectContent>
    </Select>
  );
}
