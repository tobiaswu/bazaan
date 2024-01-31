import { LayoutDashboard, PlusCircle, Settings, Store } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { RouteId } from '@/lib';
import { CreateShopDialog } from './CreateShopDialog';
import { SettingsDropdownMenu } from './SettingsDropdownMenu';

export const Sidebar = () => {
  return (
    <div className="max-w-xs bg-slate-300 flex flex-col gap-4 h-screen p-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          Amanda
        </div>
        <SettingsDropdownMenu
          triggerElement={
            <Button variant="ghost" size="icon">
              <Settings />
            </Button>
          }
        />
      </div>

      <Link href={RouteId.dashboard}>
        <div className="flex items-center gap-2">
          <LayoutDashboard />
          Discovery
        </div>
      </Link>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Store />
          My Shop
        </div>
        <CreateShopDialog
          triggerElement={
            <Button variant="ghost" size="icon">
              <PlusCircle />
            </Button>
          }
        />
      </div>

      <Separator />
    </div>
  );
};
