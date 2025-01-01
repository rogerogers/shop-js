import { Button } from '@rogerogers/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';

export const TemuPanel = () => {
  return (
    <div>
      <Card className="h-screen flex flex-col">
        <CardHeader>
          <CardTitle>hibobi</CardTitle>
          <CardDescription>hibobi web extension</CardDescription>
        </CardHeader>
        <CardContent className="h-full">
          <Card>
            <CardHeader>
              <CardTitle>仓库相关操作</CardTitle>
              <CardDescription>仓库相关操作</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button size={'sm'}>显示发货单操作</Button>
              <Button size={'sm'} className="bg-red-500">
                一键关闭弹窗
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>运营相关操作</CardTitle>
              <CardDescription>运营相关操作</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button size={'sm'} className="bg-purple-500">
                显示备货单操作
              </Button>
              <Button size={'sm'} className="bg-orange-500">
                一键拒绝调价
              </Button>
              <Button size={'sm'} className="bg-yellow-500">
                备货单操作大屏
              </Button>
              <Button size={'sm'} className="bg-green-500">
                显示易仓库存
              </Button>
              <Button size={'sm'} className="bg-cyan-500">
                显示易仓操作
              </Button>
              <Button size={'sm'} className="bg-blue-500">
                抢发货台
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
