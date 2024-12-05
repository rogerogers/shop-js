import { NextImage } from '@rogerogers/next-common/custom/next-image';
import { Card, CardContent, CardFooter, CardHeader } from '@rogerogers/ui/card';

export default function Page() {
  return (
    <Card>
      <CardHeader>Collections</CardHeader>
      <CardContent>
        <NextImage src="https://img.ltwebstatic.com/images3_ccc/2024/04/01/56/171193812092bec676cd04cd8ee0fe685ad9cf5f4e.webp" />
      </CardContent>
      <CardFooter>Collections</CardFooter>
    </Card>
  );
}
