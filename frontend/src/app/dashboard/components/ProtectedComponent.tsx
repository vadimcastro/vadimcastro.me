// src/app/dashboard/components/ProtectedComponent.tsx
"use client";
import { useAuth } from '../../../lib/auth/AuthContext';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function ProtectedComponent() {
  const { token } = useAuth();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProtectedData = async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/protected-route', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProtectedData();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="w-6 h-6 animate-spin text-mint-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-md">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Protected Data</h2>
      {data && (
        <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}