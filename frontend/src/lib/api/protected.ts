// src/lib/api/protected.ts
import { useAuth } from '../../lib/auth/AuthContext';

export const useProtectedApi = () => {
  const { token } = useAuth();

  const fetchProtected = async <T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> => {
    if (!token) {
      throw new Error('No authentication token available');
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  };

  return { fetchProtected };
};