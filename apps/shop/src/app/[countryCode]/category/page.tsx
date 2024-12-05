'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import repeat from '@/lib/util/repeat';

export default function MobileNavigation() {
  return (
    <div className="p-1 flex">
      <Tabs defaultValue="cate1" className="w-[400px] grow-col flex mx-auto">
        <TabsList className="grid w-full grid-cols-1 h-full max-w-[120px]">
          {repeat(10).map((i) => {
            return (
              <TabsTrigger className="p-4" value={`cate${i + 1}`} key={i}>
                {`cate${i + 1}`}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {repeat(10).map((i) => {
          return (
            <TabsContent value={`cate${i + 1}`} className="mt-0 h-full" key={i}>
              <Card className="border-none">
                <CardHeader>
                  <CardTitle>{`Account${i + 1}`}</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when
                    you&lsquo;re done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
                <CardFooter className="border-none">
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
