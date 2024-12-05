'use client';

import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

import { getSelectionProductSellPerDay } from '@/service/selection-client';
import { ChartConfig, ChartContainer } from '@rogerogers/ui/chart';
import { useEffect, useState } from 'react';

const chartConfig = {
  value: {
    label: 'seller',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export function SellPerDayChart({ offerId }: { offerId: number }) {
  const [chartData, setChartData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getSelectionProductSellPerDay(offerId);
      setChartData(res?.result?.result);
    };
    fetchData();
  }, [offerId]);
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <LineChart accessibilityLayer data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line dataKey="value" fill="var(--color-value)" radius={4} />
      </LineChart>
    </ChartContainer>
  );
}
