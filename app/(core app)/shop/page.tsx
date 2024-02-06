'use client';

import { ProductCreateDialog } from '@/components/ProductCreateDialog';
import { ShopProductGrid } from '@/components/ShopProductGrid';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (shopId) {
      (async () => {
        setLoading(true);
        await getDoc({
          collection: 'shops',
          key: shopId,
        }).then((doc) => {
          setDoc(doc as Doc<ShopDto> | undefined);
          setLoading(false);
        });
      })();
    }
  }, [shopId, doc?.data.products]);

  return (
    <section className="container px-4 py-4 mx-auto flex flex-col">
      {loading ? (
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      ) : (
        <>
          <div className="rounded-lg h-64 overflow-hidden relative">
            <Image
              alt="content"
              className="object-cover object-center h-full w-full"
              src={
                doc?.data.design
                  ? `/assets/${doc.data.design}-design-wide_compressed.webp`
                  : 'https://dummyimage.com/1200x500'
              }
              width={0}
              height={0}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-slate-100 bg-opacity-70 px-16 py-8 rounded-lg shadow-xl backdrop-blur-sm">
              <h1 className="text-4xl font-semibold capitalize">
                {doc?.data.title}
              </h1>
              <p className="text-xl pt-8">{doc?.data.description}</p>
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <div></div>

            {doc &&
              (!doc.data.products ? (
                <div className="sm:w-1/3 mx-auto text-center sm:py-8">
                  <PackageSearch className="w-20 h-20 rounded-lg bg-gray-200 p-4 inline-flex" />
                  <div className="flex flex-col items-center text-center justify-center gap-2 my-4">
                    <h2 className="font-semibold text-xl">
                      It&apos;s empty here
                    </h2>
                    <p>
                      What do you want to sell? Start by adding your first
                      product or service.
                    </p>
                  </div>
                  <ProductCreateDialog
                    triggerElement={
                      <Button className="gap-2">
                        <PlusCircle />
                        Add product
                      </Button>
                    }
                    shop={doc}
                  />
                </div>
              ) : (
                <ShopProductGrid products={doc.data.products} />
              ))}
          </div>
        </>
      )}
    </section>
  );
}
