// src/app/vadim/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useProtectedApi } from '../../lib/api/protected';
import { useAuth } from '../../lib/auth/AuthContext';

export default function AdminDashboard() {
  const api = useProtectedApi();
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example protected API call
        const response = await api.get('/api/v1/protected-endpoint');
        setData(response);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name || user?.username}</h2>
          {/* Your dashboard content */}
        </div>
      </div>
    </div>
  );
}