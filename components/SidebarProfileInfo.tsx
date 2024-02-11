import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Doc, ListResults, listDocs } from '@junobuild/core-peer';
import { ProfileDto } from '@/lib/types';
import { useAuth } from '@/hooks';
import { Skeleton } from './ui/skeleton';

export interface SidebarProfileInfoProps {}

export const SidebarProfileInfo = ({}: SidebarProfileInfoProps) => {
  const [profileData, setProfileData] = useState<Doc<ProfileDto> | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await listDocs({
        collection: 'profiles',
        filter: {
          owner: user?.owner,
        },
      })
        .catch((error) => {
          console.log('Failed to fetch profile data', error);
          setError(error);
        })
        .then((doc) => {
          setProfileData((doc as ListResults<Doc<ProfileDto>>).items[0]);
        })
        .finally(() => setLoading(false));
    })();
  }, [user?.owner]);

  if (loading) {
    return <Skeleton className="h-10 w-52" />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="flex items-center gap-2 truncate">
      <Avatar>
        <AvatarImage src={profileData?.data.avatarUrl} />
        <AvatarFallback>
          {profileData?.data.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {profileData?.data.username}
    </div>
  );
};
