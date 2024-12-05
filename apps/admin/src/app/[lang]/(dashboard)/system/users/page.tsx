import { Link } from '@rogerogers/i18n/routing';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';

export default async function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>权限管理</CardTitle>
        <CardDescription>权限管理</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 list-none">
          <li>
            <Link href={'/users/roles'} className="text-blue-500">
              角色
            </Link>
          </li>
          <li>
            <Link href={'/users/permissions'} className="text-blue-500">
              权限
            </Link>
          </li>
          <li>
            <Link href={'/users/whitelist'} className="text-blue-500">
              白名单
            </Link>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
