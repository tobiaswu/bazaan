'use client';

import { ProductCreateDialog } from '@/components/ProductCreateDialog';
import { Button } from '@/components/ui/button';
import { ShopDto } from '@/lib/types';
import { Doc, getDoc } from '@junobuild/core-peer';
import { PackageSearch, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Shop() {
  const searchParams = useSearchParams();
  const shopId = searchParams.get('id');
  const [doc, setDoc] = useState<Doc<ShopDto> | undefined>();

  useEffect(() => {
    if (shopId) {
      (async () =>
        await getDoc({
          collection: 'shops',
          key: shopId,
        }).then((doc) => setDoc(doc as Doc<ShopDto> | undefined)))();
    }
  }, [shopId]);

  return (
    <section className="container px-4 py-4 mx-auto flex flex-col">
      <div className="rounded-lg h-64 overflow-hidden relative">
        <Image
          alt="content"
          className="object-cover object-center h-full w-full"
          src="https://dummyimage.com/1200x500"
          width={0}
          height={0}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-4xl font-semibold capitalize">
            {doc?.data.title}
          </h1>
          <p className="text-lg pt-4">{doc?.data.description}</p>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <div className="sm:w-1/3 mx-auto text-center sm:py-8">
          <PackageSearch className="w-20 h-20 rounded-lg bg-gray-200 p-4 inline-flex" />
          <div className="flex flex-col items-center text-center justify-center gap-2 my-4">
            <h2 className="font-semibold text-xl">It&apos;s empty here</h2>
            <p>
              What do you want to sell? Start by adding your first product or
              service.
            </p>
          </div>
          <ProductCreateDialog
            triggerElement={
              <Button className="gap-2">
                <PlusCircle />
                Add product
              </Button>
            }
            shopId={shopId ?? ''}
          />
        </div>
      </div>
    </section>
  );
}
