// src/components/ExampleProtectedComponent.tsx
'use client';

import { useState, useEffect } from 'react';
import { useProtectedApi } from '../lib/api/protected';

interface Data {
  // Define your data type here
  id: number;
  title: string;
  // ... other fields
}

export default function ExampleProtectedComponent() {
  const { fetchProtected, get } = useProtectedApi();
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // You can use either fetchProtected directly
        const data1 = await fetchProtected<Data[]>('/api/v1/your-endpoint', {
          method: 'GET'
        });

        // Or use the convenience method
        const data2 = await get<Data[]>('/api/v1/your-endpoint');

        setData(data2);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          {/* Render your data */}
        </div>
      ))}
    </div>
  );
}