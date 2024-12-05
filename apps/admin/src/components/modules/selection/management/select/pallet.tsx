'use client';

import { useRouter } from '@rogerogers/i18n/routing';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@rogerogers/ui/select';
import { useSearchParams } from 'next/navigation';

const PalletSelect: React.FC<any> = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  return (
    <Select defaultValue={searchParam?.get('pallet') ?? undefined}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="选择平台" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="230155431">速卖通箱包货盘</SelectItem>
        <SelectItem value="230155430">速卖通女装欧美货盘</SelectItem>
        <SelectItem value="230155429">速卖通童装欧美货盘</SelectItem>
        <SelectItem value="230155428">shein家居日用货盘</SelectItem>
        <SelectItem value="230155427">shein宠物服装</SelectItem>
        <SelectItem value="230155426">shein童装欧美货盘</SelectItem>
        <SelectItem value="230155425">亚马逊欧美箱包货盘</SelectItem>
        <SelectItem value="230155424">亚马逊欧美女装货盘</SelectItem>
        <SelectItem value="230155422">shein女装欧美货盘</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default PalletSelect;
