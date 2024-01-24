'use client';

import { Navbar } from '@/components/Navbar';
import { SignInButton } from '@/components/SignInButton';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="text-gray-600">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="font-bold sm:text-4xl text-3xl mb-4 text-gray-900">
              Open Food
            </h1>
            <p className="mb-4 leading-relaxed text-2xl">
              A decentralized social network for trading food, tools and
              services for small and medium farmers and homesteaders
            </p>
            <p className="mb-8 leading-relaxed text-lg">
              Open Food is running on the Internet Computer blockchain
            </p>
            <SignInButton />
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <Image
              className="object-cover object-center rounded"
              alt="hero"
              src="https://dummyimage.com/720x600"
              width={720}
              height={600}
            />
          </div>
        </div>
      </section>
    </>
  );
}
