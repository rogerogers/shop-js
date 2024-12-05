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
    <Select
      defaultValue={searchParam?.get('pallet') ?? undefined}
      onValueChange={(v) => {
        const p = new URLSearchParams(searchParam.toString());
        p.set('pallet', v);
        p.set('page', '1');
        router.push(`/selection/alibaba/goods?${p.toString()}`);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="选择货盘" />
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
        <SelectItem value="245449251">1688精选select 箱包</SelectItem>
        <SelectItem value="245449249">1688精选select 童装</SelectItem>
        <SelectItem value="245449248">1688精选select 女装</SelectItem>
        <SelectItem value="251146691">ACC手链</SelectItem>
        <SelectItem value="251146692">ACC钥匙扣</SelectItem>
        <SelectItem value="251146693">ACC帽子</SelectItem>
        <SelectItem value="251146694">ACC美甲贴</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default PalletSelect;
