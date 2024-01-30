import Image from 'next/image';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Designs } from '@/lib/enums';

export interface ShopDesignPickerProps {
  selectedDesign: Designs;
  // eslint-disable-next-line no-unused-vars
  onSelect: (design: Designs) => void;
}

type ShopDesign = {
  id: Designs;
  title: string;
  thumbnailUrl: string;
};

const designs: ShopDesign[] = [
  {
    id: Designs.EMERALD,
    title: 'Emerald',
    thumbnailUrl: 'https://dummyimage.com/150x200',
  },
  {
    id: Designs.SAPPHIRE,
    title: 'Sapphire',
    thumbnailUrl: 'https://dummyimage.com/150x200',
  },
  {
    id: Designs.RUBY,
    title: 'Ruby',
    thumbnailUrl: 'https://dummyimage.com/150x200',
  },
];

export const ShopDesignPicker = ({
  selectedDesign,
  onSelect,
}: ShopDesignPickerProps) => {
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
                className="aspect-[3/4] h-fit w-fit object-cover"
                width={300}
                height={400}
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
