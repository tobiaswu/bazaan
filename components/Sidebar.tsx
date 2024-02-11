'use client';

import {
  ChevronRight,
  LayoutDashboard,
  MoreVertical,
  Settings,
  Store,
} from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { RouteId } from '@/lib';
import { SettingsDropdownMenu } from './SettingsDropdownMenu';
import { useChannel, useShop } from '@/hooks';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { ChannelDto } from '@/lib/types';
import { SidebarProfileInfo } from './SidebarProfileInfo';
import { ShopDropdownMenu } from './ShopDropdownMenu';

export const Sidebar = () => {
  const { hasShop, data: shops } = useShop();
  const { hasChannel, data: channels } = useChannel();

  return (
    <div className="bg-slate-200 flex flex-col w-64 gap-4 h-full overflow-auto p-2">
      <div className="flex items-center justify-between gap-2 bg-slate-300 p-2 rounded-lg">
        <SidebarProfileInfo />
        <SettingsDropdownMenu
          triggerElement={
            <Button className="justify-center" variant="ghost" size="icon">
              <Settings />
            </Button>
          }
        />
      </div>

      <Link
        className={`flex items-center justify-between gap-2 ${buttonVariants({
          variant: 'ghost',
        })}`}
        href={RouteId.discovery}
      >
        <div className="flex items-center gap-2">
          <LayoutDashboard />
          Discovery
        </div>
      </Link>

      {hasShop && (
        <Link
          href={RouteId.shop(shops[0]?.key)}
          className={`flex items-center justify-between gap-2 ${buttonVariants({
            variant: 'ghost',
          })}`}
        >
          <div className="flex items-center gap-2">
            <Store />
            My Shop
          </div>
          <ShopDropdownMenu
            shop={shops[0]}
            triggerElement={
              <Button className="justify-center" variant="ghost" size="icon">
                <MoreVertical />
              </Button>
            }
          />
        </Link>
      )}

      <Separator className="bg-slate-400" />

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Channels</AccordionTrigger>
          <AccordionContent>
            {hasChannel ? (
              channels.map((channel) => {
                return (
                  <Link
                    key={channel.key}
                    href={RouteId.channel(channel.key)}
                    className={buttonVariants({
                      variant: 'ghost',
                      className: 'w-full',
                    })}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <ChevronRight />
                      <p className="truncate">
                        {(channel.data as ChannelDto).title}
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p>Start by joining or creating a channel</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
