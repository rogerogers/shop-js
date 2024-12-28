import '@pages/panel/Panel.css';
import { Button } from '@rogerogers/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';
import { JSX } from 'react';

export default function Popup(): JSX.Element {
  return (
    <Card className="h-screen">
      <CardHeader>
        <CardTitle>wholesale</CardTitle>
        <CardDescription>wholesale</CardDescription>
      </CardHeader>
      <CardContent className="flex mx-auto justify-center">
        <Button
          onClick={() => {
            chrome.tabs.query(
              { active: true, currentWindow: true },
              function (tabs) {
                chrome.notifications.create({
                  type: 'basic',
                  iconUrl:
                    'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://hibobi.com&size=128',
                  title: 'wholesale',
                  message: tabs[0].url ?? '',
                });
              },
            );
          }}
        >
          采集
        </Button>
      </CardContent>
      <CardFooter>wholesale</CardFooter>
    </Card>
  );
}
