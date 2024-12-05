import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const CheckboxWithLabel = ({
  checked = true,
  onChange,
  label,
  name,
  'data-testid': dataTestId,
}: any) => {
  return (
    <div className="flex items-center space-x-2 ">
      <Checkbox
        className="text-base-regular flex items-center gap-x-2"
        id="checkbox"
        role="checkbox"
        type="button"
        checked={checked}
        aria-checked={checked}
        onClick={onChange}
        name={name}
        data-testid={dataTestId}
      />
      <Label htmlFor="checkbox" className="!transform-none !txt-medium">
        {label}
      </Label>
    </div>
  );
};

export default CheckboxWithLabel;
