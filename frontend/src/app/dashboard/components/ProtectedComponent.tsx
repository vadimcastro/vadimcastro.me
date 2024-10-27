// src/app/dashboard/components/ProtectedComponent.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../lib/auth/AuthContext';

export default function ProtectedComponent() {
  const { accessToken, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push('/login');
    }
  }, [accessToken, router]);

  if (!accessToken || !user) {
    return null;
  }

  return (
    <div>
      {/* Your protected content here */}
      <h2>Welcome {user.username}</h2>
    </div>
  );
}