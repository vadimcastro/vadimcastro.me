// src/lib/auth/withAuth.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function ProtectedRoute(props: P) {
    const { isAuthenticated, isLoading, accessToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/login');
      }
    }, [isLoading, isAuthenticated, router]);

    // Show nothing while checking authentication
    if (isLoading) {
      return <div>Loading...</div>;
    }

    // Show nothing if not authenticated
    if (!accessToken) {
      return null;
    }

    // If authenticated, show the protected component
    return <WrappedComponent {...props} />;
  };
}