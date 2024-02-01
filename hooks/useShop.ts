import { useEffect, useState } from 'react';
import { useAuth } from '.';
import { listDocs } from '@junobuild/core-peer';

export const useShop = () => {
  const { user } = useAuth();
  const [hasShop, setHasShop] = useState<boolean>(true);

  const hasShops = async () => {
    await listDocs({
      collection: 'shops',
      filter: {
        owner: user?.owner,
      },
    })
      .then((data) => data.items_length > 0)
      .then((result) => setHasShop(result));
  };

  useEffect(() => {
    (async () => await hasShops())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { hasShop };
};
