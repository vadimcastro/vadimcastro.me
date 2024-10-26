// Example usage in a protected component:
// src/app/dashboard/components/ExampleProtectedComponent.tsx
"use client";
import { useProtectedApi } from '../../../lib/api/protected';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface ProtectedData {
  // Define your data type here
  id: string;
  title: string;
  // ... other fields
}

export default function ExampleProtectedComponent() {
  const { fetchProtected } = useProtectedApi();
  const [data, setData] = useState<ProtectedData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchProtected<ProtectedData[]>(
          'http://localhost:8000/api/v1/protected-route'
        );
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="p-4 bg-gray-50 rounded-md">
            <h3>{item.title}</h3>
            {/* Render other data fields */}
          </div>
        ))}
      </div>
    </div>
  );
}