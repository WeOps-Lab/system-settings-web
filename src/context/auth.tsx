'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  token: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    console.log('session:', session);
    if (!session) {
      signIn('keycloak');
      return;
    }
    if (session?.accessToken) {
      setToken(session.accessToken);
      const userLocale = session.locale || 'en';
      localStorage.setItem('locale', userLocale);
    } else {
      console.warn('No accessToken found in session');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className='first-loader-wrapper'>
        <div className='loading-arc'></div>
        <h1><span>LOADING</span></h1>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;