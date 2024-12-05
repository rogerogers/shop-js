import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cookies } from 'next/headers';

const ProductOnboardingCta = () => {
  const isOnboarding = cookies().get('_medusa_onboarding')?.value === 'true';

  if (!isOnboarding) {
    return null;
  }

  return (
    <Container className="max-w-4xl h-full bg-ui-bg-subtle w-full p-8">
      <div className="flex flex-col gap-y-4 center">
        <span className="text-ui-fg-base text-xl">
          Your demo product was successfully created! 🎉
        </span>
        <span className="text-ui-fg-subtle text-small-regular">
          You can now continue setting up your store in the admin.
        </span>
        <a href="http://localhost:7001/a/orders?onboarding_step=create_order_nextjs">
          <Button className="w-full">Continue setup in admin</Button>
        </a>
      </div>
    </Container>
  );
};

export default ProductOnboardingCta;
