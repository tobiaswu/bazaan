import { signIn } from '@junobuild/core-peer';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { RouteId } from '@/lib';
import { useState } from 'react';
import { LoadingScreen } from './LoadingScreen';

export const SignInButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn()
      .then(() => router.push(RouteId.discovery))
      .then(() => setLoading(false));
  };

  if (loading) {
    return <LoadingScreen />;
  } else {
    return <Button onClick={handleSignIn}>Launch app</Button>;
  }
};
