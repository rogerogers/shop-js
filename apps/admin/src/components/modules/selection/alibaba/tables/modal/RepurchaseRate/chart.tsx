'use client';

import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

import { getSelectionRepurchaseRate } from '@/service/selection-client';
import { ChartConfig, ChartContainer } from '@rogerogers/ui/chart';
import { useEffect, useState } from 'react';

const chartConfig = {
  value: {
    label: 'seller',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export function RepurchaseRateChart({ offerId }: { offerId: number }) {
  const [chartData, setChartData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getSelectionRepurchaseRate(offerId);
      setChartData(
        res?.result?.result.map((item: { date: string; value: string }) => {
          return Object.assign(item, {
            value: parseInt(
              (item.value as string).substring(0, item.value.length - 1),
            ),
          });
        }),
      );
    };
    fetchData();
  }, [offerId]);
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart accessibilityLayer data={chartData}>
        <XAxis dataKey="date" />
        <YAxis glyphName={'%'} />
        <Tooltip />
        <Line dataKey="value" fill="var(--color-value)" radius={4} />
      </LineChart>
    </ChartContainer>
  );
}
