'use client';
import { useEffect, useState } from 'react';
import { get } from '../utils/request';
import { signIn } from 'next-auth/react';

const HomePage = () => {
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    console.log('coming~~');
    const fetchData = async () => {
      try {
        const response = await get('/idc/datacenter/topo');
        console.log('Fetched data:', response);
        setData(response);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSignIn = async () => {
    try {
      console.log('keycloak');
      await signIn('keycloak');
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <div>
      <h1>Data from API:</h1>
      <button onClick={handleSignIn}>Sign in with Keycloak</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default HomePage;
