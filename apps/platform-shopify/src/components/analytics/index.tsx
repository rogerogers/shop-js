import { Card, CardContent, CardHeader, CardTitle } from '@rogerogers/ui/card';

export function Analytics() {
  return (
    <Card className="basis-1/4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">今日上新</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">50</div>
        <p className="text-xs text-muted-foreground">5% from yesterday</p>
      </CardContent>
    </Card>
  );
}
