import Image from 'next/image';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

export interface Props {}

type ShopDesign = {
  title: string;
  thumbnailUrl: string;
};

const designs: ShopDesign[] = [
  {
    title: 'Emerald',
    thumbnailUrl: 'https://dummyimage.com/150x200',
  },
  {
    title: 'Sapphire',
    thumbnailUrl: 'https://dummyimage.com/150x200',
  },
  {
    title: 'Ruby',
    thumbnailUrl: 'https://dummyimage.com/150x200',
  },
];

export const ShopDesignPicker = ({}: Props) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {designs.map((design) => (
          <figure key={design.title} className="shrink-0">
            <div className="overflow-hidden rounded-md">
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
