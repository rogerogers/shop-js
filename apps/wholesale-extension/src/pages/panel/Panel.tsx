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
        <Button>采集</Button>
      </CardContent>
      <CardFooter>wholesale</CardFooter>
    </Card>
  );
}
