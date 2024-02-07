'use client';

import { DiscoverySearchBar } from '@/components/DiscoverySearchBar';
import { Skeleton } from '@/components/ui/skeleton';
import { RouteId } from '@/lib';
import { ChannelDto, ShopDto } from '@/lib/types';
import { Doc, ListResults, listDocs } from '@junobuild/core-peer';
import { Box, MessageCircle, MoveRight, Star, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Discovery() {
  const [shopsData, setShopsData] = useState<
    ListResults<Doc<ShopDto>> | undefined
  >();
  const [channelsData, setChannelsData] = useState<
    ListResults<Doc<ChannelDto>> | undefined
  >();
  const [shopsLoading, setShopsLoading] = useState(false);
  const [channelsLoading, setChannelsLoading] = useState(false);
  const [shopsError, setShopsError] = useState<any>(null);
  const [channelsError, setChannelsError] = useState<any>(null);

  useEffect(() => {
    (async () => {
      setShopsLoading(true);
      await listDocs({
        collection: 'shops',
        filter: {
          paginate: { limit: 4 },
          order: { field: 'created_at', desc: true },
        },
      })
        .then((data) =>
          setShopsData(data as ListResults<Doc<ShopDto>> | undefined)
        )
        .catch((error) => {
          console.log('Failed to fetch shops data', error);
          setShopsError(error);
        })
        .finally(() => setShopsLoading(false));
    })();

    (async () => {
      setChannelsLoading(true);
      await listDocs({
        collection: 'channels',
        filter: {
          paginate: { limit: 4 },
          order: { field: 'created_at', desc: true },
        },
      })
        .then((data) =>
          setChannelsData(data as ListResults<Doc<ChannelDto>> | undefined)
        )
        .catch((error) => {
          console.log('Failed to fetch channels data', error);
          setChannelsError(error);
        })
        .finally(() => setChannelsLoading(false));
    })();
  }, []);

  return (
    <div>
      <DiscoverySearchBar />

      <div className="mt-8">
        <h2 className="font-semibold text-lg pb-2">Channels</h2>
        <div className="flex flex-wrap">
          {channelsLoading ? (
            [1, 2, 3].map((item) => (
              <Skeleton key={item} className="m-4 w-64 h-64" />
            ))
          ) : channelsError ? (
            <div>Error: {channelsError.message}</div>
          ) : channelsData ? (
            channelsData.items.map((item) => {
              return (
                <div key={item.key} className="p-4 lg:w-1/3">
                  <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 border-2 border-gray-200 border-opacity-60 shadow-md rounded-lg overflow-hidden text-center relative">
                    <h4 className="tracking-widest text-xs font-medium text-gray-400 mb-1">
                      {item.data.city.toUpperCase()}
                    </h4>
                    <h3 className="capitalize sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                      {item.data.title}
                    </h3>
                    <p className="leading-relaxed mb-3">
                      {item.data.description}
                    </p>
                    <Link
                      href={RouteId.channel(item.key)}
                      className="text-indigo-500 inline-flex items-center hover:text-indigo-900"
                    >
                      Join Channel
                      <MoveRight />
                    </Link>
                    <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                      <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <User />
                        1.2K
                      </span>
                      <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                        <MessageCircle />6
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No channels data available</div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-lg pb-2">Shops</h2>
        <div className="flex flex-wrap">
          {shopsLoading ? (
            [1, 2, 3].map((item) => (
              <Skeleton key={item} className="m-4 w-64 h-64" />
            ))
          ) : shopsError ? (
            <div>Error: {shopsError.message}</div>
          ) : shopsData ? (
            shopsData.items.map((item) => {
              const productCount = item.data.products?.length;
              return (
                <div key={item.key} className="p-4 md:w-1/3">
                  <div className="h-full border-2 border-gray-200 border-opacity-60 shadow-md rounded-lg overflow-hidden">
                    <Link href={RouteId.shop(item.key)}>
                      <Image
                        className="lg:h-48 md:h-36 w-full object-cover object-center"
                        src={`/assets/${item.data.design}-design-wide_compressed.webp`}
                        alt="shop cover"
                        width={0}
                        height={0}
                      />
                    </Link>
                    <div className="p-6">
                      <h4 className="tracking-widest text-xs font-medium text-gray-400 mb-1">
                        {productCount === 1
                          ? productCount + ' Product'
                          : productCount + ' Products'}
                      </h4>
                      <h3 className="capitalize text-lg font-medium text-gray-900 mb-3">
                        {item.data.title}
                      </h3>
                      <p className="leading-relaxed mb-3">
                        {item.data.description}
                      </p>
                      <div className="flex items-center flex-wrap ">
                        <Link
                          href={RouteId.shop(item.key)}
                          className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 hover:text-indigo-900"
                        >
                          Visit Shop
                          <MoveRight />
                        </Link>
                        <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                          <Box />
                          1.2K
                        </span>
                        <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                          <Star />5
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No shops data available</div>
          )}
        </div>
      </div>
    </div>
  );
}
