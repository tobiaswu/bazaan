import { useChannel, useShop } from '@/hooks';
import { ChannelCreateDialog } from './ChannelCreateDialog';
import { ShopCreateDialog } from './ShopCreateDialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

export interface Props {}

export const DiscoverySearchBar = ({}: Props) => {
  const { hasShop } = useShop();
  const { hasChannel } = useChannel();

  return (
    <div className="flex gap-4 items-center justify-between">
      <h1 className="font-bold text-2xl">Discovery</h1>
      <Input type="search" placeholder="Search for channels or shops" />
      <div className="flex gap-2">
        <ChannelCreateDialog
          triggerElement={
            <Button disabled={hasChannel} variant="outline">
              Create a channel
            </Button>
          }
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
  );
};
