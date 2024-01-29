import { signIn } from '@junobuild/core-peer';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { RouteId } from '@/lib';

export const SignInButton = () => {
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn().then(() => router.push(RouteId.dashboard));
  };

  return <Button onClick={handleSignIn}>Launch app</Button>;
};
