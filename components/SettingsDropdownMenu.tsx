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

export interface SettingsDropdownMenuProps {
  triggerElement: JSX.Element;
}

export const SettingsDropdownMenu = ({
  triggerElement,
}: SettingsDropdownMenuProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut().then(() => router.push(RouteId.root));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerElement}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
