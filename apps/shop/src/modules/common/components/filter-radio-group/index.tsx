import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  'data-testid': dataTestId,
}: any) => {
  return (
    <div className="flex gap-x-3 flex-col gap-y-3">
      <span className="txt-compact-small-plus text-ui-fg-muted">{title}</span>
      <RadioGroup data-testid={dataTestId}>
        {items?.map((i: any) => (
          <div
            key={i.value}
            className={cn('flex gap-x-2 items-center', {
              'ml-[-1.75rem]': i.value === value,
            })}
          >
            {/*{i.value === value && <EllipseMiniSolid />}*/}
            <RadioGroupItem
              checked={i.value === value}
              onClick={(e) => handleChange(e, i.value)}
              className="hidden peer"
              id={i.value}
              value={i.value}
            />
            <Label
              htmlFor={i.value}
              className={cn(
                '!txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer',
                {
                  'text-ui-fg-base': i.value === value,
                },
              )}
              data-testid="radio-label"
              data-active={i.value === value}
            >
              {i.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterRadioGroup;
