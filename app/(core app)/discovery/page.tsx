'use client';

import { ChannelCreateDialog } from '@/components/ChannelCreateDialog';
import { ShopCreateDialog } from '@/components/ShopCreateDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useShop } from '@/hooks';

export default function Discovery() {
  const { hasShop } = useShop();

  return (
    <div className="px-8 py-4 w-full">
      <div className="flex gap-4 items-center justify-between">
        <h1 className="font-bold text-2xl">Discovery</h1>
        <Input type="search" placeholder="Search for channels or shops" />
        <div className="flex gap-2">
          <ChannelCreateDialog
            triggerElement={<Button variant="outline">Create a channel</Button>}
          />
          <ShopCreateDialog
            triggerElement={
              <Button disabled={hasShop} variant="outline">
                Create a shop
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
