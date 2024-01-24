import { signIn } from '@junobuild/core-peer';
import { Button } from './ui/Button';

export const SignInButton = () => {
  const handleSignIn = async () => {
    await signIn();
  };

  return <Button onClick={handleSignIn}>Launch app</Button>;
};
