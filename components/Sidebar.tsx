import { LayoutDashboard, PlusCircle, Settings, Store } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

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
        <Button variant="ghost" size="icon">
          <Settings />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <LayoutDashboard />
        Discovery
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Store />
          My Shop
        </div>
        <Button variant="ghost" size="icon">
          <PlusCircle />
        </Button>
      </div>

      <Separator />
    </div>
  );
};
