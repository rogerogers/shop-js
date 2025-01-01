import { Button } from '@rogerogers/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';
import { RefreshCw } from 'lucide-react';
export const DefaultPanel = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>当前站点尚未支持</CardTitle>
        <CardDescription>如需添加，请联系我</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => {
            location.reload();
          }}
        >
          <RefreshCw />
        </Button>
      </CardContent>
    </Card>
  );
};
