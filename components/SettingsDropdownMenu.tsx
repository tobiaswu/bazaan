import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { signOut } from '@junobuild/core-peer';
import { RouteId } from '@/lib';
import { useState } from 'react';
import { LoadingScreen } from './LoadingScreen';
import Link from 'next/link';

export interface SettingsDropdownMenuProps {
  triggerElement: JSX.Element;
}

export const SettingsDropdownMenu = ({
  triggerElement,
}: SettingsDropdownMenuProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut()
      .then(() => router.push(RouteId.root))
      .then(() => setLoading(false));
  };

  if (loading) {
    return <LoadingScreen />;
  } else {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{triggerElement}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={RouteId.wallet}>
            <DropdownMenuItem>Balances</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};
