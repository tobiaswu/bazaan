import { useEffect, useState } from 'react';
import { useAuth } from '.';
import { Doc, listDocs } from '@junobuild/core-peer';

export const useChannel = () => {
  const { user } = useAuth();
  const [hasChannel, setHasChannel] = useState<boolean>(true);
  const [data, setData] = useState<Doc<unknown>[]>([]);

  const channels = async () => {
    const channelList = await listDocs({
      collection: 'channels',
      filter: {
        owner: user?.owner,
      },
    }).then((data) => data);

    setHasChannel(channelList.items_length > 0);
    setData(channelList.items);
  };

  useEffect(() => {
    (async () => await channels())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { hasChannel, data };
};
