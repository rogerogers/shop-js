// @ts-nocheck
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { onlyUnique } from '@/lib/util/only-unique';

// type OptionSelectProps = {
//   option: ProductOption
//   current: string
//   updateOption: (option: Record<string, string>) => void
//   title: string
//   disabled: boolean
//   "data-testid"?: string
// }

const OptionSelect = ({
  option,
  current,
  updateOption,
  title,
  'data-testid': dataTestId,
  disabled,
  last,
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique);

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">Select {title}</span>
      {!last ? (
        <RadioGroup
          type="single"
          className="grid grid-cols-3 gap-4"
          value={current}
        >
          {filteredOptions.map((v) => {
            return (
              <div
                key={v}
                value={v}
                onClick={() => updateOption({ [option.id]: v })}
              >
                <RadioGroupItem value={v} id={v} className="peer sr-only" />
                <Label
                  htmlFor={v}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  {v}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      ) : (
        filteredOptions.map((v) => {
          return (
            <div className="flex" key={v}>
              <Label
                className="w-1/3 flex items-center text-center"
                htmlFor={v}
              >
                <div className="w-full">{v}</div>
              </Label>
              <div className="flex w-full max-w-sm items-center">
                <Button type="button">-</Button>
                <Input
                  id={v}
                  type="number"
                  className="w-1/3 rounded-none -ml-1 -mr-1 z-10"
                  placeholder={0}
                  min={0}
                />
                <Button type="button">+</Button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OptionSelect;
