import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function ProductSpec({ items }: { items: string[] }) {
  return (
    <ToggleGroup type="single">
      {items.map((item: string, index: number) => (
        <ToggleGroupItem key={index} value={item} aria-label="Toggle bold">
          {toTitleCase(item)}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
