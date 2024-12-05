import { signInGithubAction } from '@/app/actions';
import { Button } from '@rogerogers/ui/button';
import { IconBrandGithub } from '@tabler/icons-react';

export default function GithubInButton() {
  return (
    <div className="flex justify-center">
      <Button
        className="w-18 h-18 px-2"
        variant="outline"
        type="button"
        title="Sign in with Github"
        onClick={() => {
          signInGithubAction().then((res) => {});
        }}
      >
        <IconBrandGithub className="h-18 w-18" />
      </Button>
    </div>
  );
}
