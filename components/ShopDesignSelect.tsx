import Image from 'next/image';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { ShopDesigns } from '@/lib/enums';

export interface ShopDesignSelectProps {
  selectedDesign: ShopDesigns;
  // eslint-disable-next-line no-unused-vars
  onSelect: (design: ShopDesigns) => void;
}

type ShopDesign = {
  id: ShopDesigns;
  title: string;
  thumbnailUrl: string;
};

const designs: ShopDesign[] = [
  {
    id: ShopDesigns.EMERALD,
    title: 'Emerald',
    thumbnailUrl: '/assets/emerald-design_compressed.webp',
  },
  {
    id: ShopDesigns.SAPPHIRE,
    title: 'Sapphire',
    thumbnailUrl: '/assets/sapphire-design_compressed.webp',
  },
  {
    id: ShopDesigns.RUBY,
    title: 'Ruby',
    thumbnailUrl: '/assets/ruby-design_compressed.webp',
  },
];

export const ShopDesignSelect = ({
  selectedDesign,
  onSelect,
}: ShopDesignSelectProps) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {designs.map((design) => (
          <figure key={design.title} className="shrink-0">
            <div
              role="button"
              className={`overflow-hidden rounded-md hover:opacity-70 ${
                design.id === selectedDesign && 'border-4 border-primary'
              }`}
              onClick={() => onSelect(design.id)}
            >
              <Image
                src={design.thumbnailUrl}
                alt={`Design: ${design.title}`}
                className="aspect-[3/4] object-cover h-[200] w-[150]"
                width={150}
                height={200}
              />
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                {design.title}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
