import { RouteId } from '@/lib';
import { User, authSubscribe } from '@junobuild/core-peer';
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<{ user: User | null | undefined }>({
  user: undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const sub = authSubscribe((user: User | null) => setUser(user));
    return () => sub();
  }, []);

  useEffect(() => {
    if (user) {
      router.push(RouteId.dashboard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {user !== undefined && user !== null && children}
    </AuthContext.Provider>
  );
};
