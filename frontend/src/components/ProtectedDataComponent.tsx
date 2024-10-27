// src/components/ProtectedDataComponent.tsx
'use client';

import { useProtectedFetch } from '../lib/api/hooks';

interface DataItem {
  id: number;
  title: string;
}

export default function ProtectedDataComponent() {
  const { data, error, loading } = useProtectedFetch<DataItem[]>('/api/v1/data');

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700">
        Error: {error.message}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.id} className="bg-white shadow rounded-lg p-4">
          <h3 className="font-medium">{item.title}</h3>
        </div>
      ))}
    </div>
  );
}