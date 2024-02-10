import { ShopDto } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { ShopProductCart } from './ShopProductCart';
import { Button } from './ui/button';
import { Ban, PlusCircle } from 'lucide-react';
import { ProductCreateDialog } from './ProductCreateDialog';
import { Doc } from '@junobuild/core-peer';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const PRODUCT_LIMIT = 5;

export interface ShopProductGridProps {
  shopData: Doc<ShopDto>;
}

export const ShopProductGrid = ({ shopData }: ShopProductGridProps) => {
  const products = shopData.data.products!;
  const limitReached = products.length >= PRODUCT_LIMIT;

  const [imageLoading, setImageLoading] = useState(true);

  const handleLoadingComplete = () => {
    setImageLoading(false);
  };

  return (
    <div>
      <div className="flex gap-4 items-center pb-2">
        <h2 className="font-semibold text-xl">All products</h2>
        {limitReached ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="flex gap-2 items-center"
                  size="sm"
                  variant="secondary"
                >
                  <Ban className="w-5 h-5" />
                  Add
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Currently you can create only 5 products. We&apos;re lifting
                  the limit soon!
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <ProductCreateDialog
            triggerElement={
              <Button
                className="flex gap-2 items-center"
                size="sm"
                variant="outline"
              >
                <PlusCircle className="w-5 h-5" />
                Add
              </Button>
            }
            shop={shopData}
          />
        )}
      </div>
      <div className="flex flex-wrap">
        {products.map((product) => {
          return (
            <div key={product.title} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div
                className="block relative h-48 rounded overflow-hidden"
                role="button"
              >
                {imageLoading && <Skeleton className="h-full w-full" />}
                <ShopProductCart
                  product={product}
                  triggerElement={
                    <Image
                      alt={product.title}
                      className="object-cover object-center w-full h-full block"
                      src={
                        product.imageUrls?.[0] ??
                        'https://dummyimage.com/420x260'
                      }
                      width={0}
                      height={0}
                      onLoad={handleLoadingComplete}
                    />
                  }
                />
              </div>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest mb-1">
                  {product.description}
                </h3>
                <h2 className="text-gray-900 text-lg font-medium">
                  {product.title}
                </h2>
                {/* <p className="mt-1">$16.00</p> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
