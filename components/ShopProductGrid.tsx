import { RouteId } from '@/lib';
import { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';

export interface ShopProductGridProps {
  products: Product[];
}

export const ShopProductGrid = ({ products }: ShopProductGridProps) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleLoadingComplete = () => {
    setImageLoading(false);
  };

  return (
    <div>
      <h2 className="font-semibold text-xl pb-2">All products</h2>
      <div className="flex flex-wrap">
        {products.map((product) => {
          const productId = product.title.toLowerCase().replace(/\s/g, '-');
          return (
            <div key={product.title} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Link
                href={RouteId.product(productId)}
                className="block relative h-48 rounded overflow-hidden"
              >
                {imageLoading && <Skeleton className="h-full w-full" />}
                <Image
                  alt={product.title}
                  className="object-cover object-center w-full h-full block"
                  src={
                    product.imageUrls?.[0] ?? 'https://dummyimage.com/420x260'
                  }
                  width={0}
                  height={0}
                  onLoadingComplete={handleLoadingComplete}
                />
              </Link>
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
