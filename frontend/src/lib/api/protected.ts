// src/lib/api/protected.ts
'use client';

import { useAuth } from '../../lib/auth/AuthContext';

export const useProtectedApi = () => {
  const { accessToken, refreshAccessToken } = useAuth();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const fetchProtected = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    let currentToken = accessToken;

    // If no token, try to refresh
    if (!currentToken) {
      currentToken = await refreshAccessToken();
      if (!currentToken) {
        throw new Error('No access token available');
      }
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${currentToken}`,
        'Content-Type': 'application/json',
      },
    });

    // If token expired, try refreshing once
    if (response.status === 401) {
      currentToken = await refreshAccessToken();
      if (currentToken) {
        const retryResponse = await fetch(`${baseUrl}${endpoint}`, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${currentToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (!retryResponse.ok) throw new Error('API request failed');
        return retryResponse.json();
      }
    }

    if (!response.ok) throw new Error('API request failed');
    return response.json();
  };

  return {
    fetchProtected,
    get: <T>(endpoint: string) => 
      fetchProtected<T>(endpoint, { method: 'GET' }),
    
    post: <T>(endpoint: string, data: any) =>
      fetchProtected<T>(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    put: <T>(endpoint: string, data: any) =>
      fetchProtected<T>(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    
    delete: <T>(endpoint: string) =>
      fetchProtected<T>(endpoint, { method: 'DELETE' }),
  };
};