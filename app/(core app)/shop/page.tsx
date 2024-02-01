import { Button } from '@/components/ui/button';
import { PackageSearch, PlusCircle } from 'lucide-react';
import Image from 'next/image';

export default function Shop() {
  return (
    <section className="container px-4 py-4 mx-auto flex flex-col">
      <div className="rounded-lg h-64 overflow-hidden">
        <Image
          alt="content"
          className="object-cover object-center h-full w-full"
          src="https://dummyimage.com/1200x500"
          width={0}
          height={0}
        />
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
          <Button className="gap-2">
            <PlusCircle />
            Add product
          </Button>
        </div>
      </div>
    </section>
  );
}
