import '@pages/options/Options.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';
import { Label } from '@rogerogers/ui/label';
import { Switch } from '@rogerogers/ui/switch';
import { JSX, useEffect, useState } from 'react';

export default function Popup(): JSX.Element {
  const [allow, setAllow] = useState(false);
  useEffect(() => {
    chrome.storage.local.get(['allowTaskRunning'], (result) => {
      console.log(result);
      setAllow(result['allowTaskRunning']);
    });
  }, []);
  return (
    <Card className="h-screen">
      <CardHeader>
        <CardTitle>wholesale</CardTitle>
        <CardDescription>wholesale</CardDescription>
      </CardHeader>
      <CardContent className="flex mx-auto justify-center">
        <div className="flex items-center space-x-2">
          <Switch
            id="allow-task-running"
            checked={allow}
            onCheckedChange={(e) => {
              chrome.storage.local.set(
                {
                  allowTaskRunning: e,
                },
                () => {
                  setAllow(e);
                },
              );
            }}
          />
          <Label htmlFor="allow-task-running">允许执行任务</Label>
        </div>
      </CardContent>
      <CardFooter>wholesale</CardFooter>
    </Card>
  );
}
