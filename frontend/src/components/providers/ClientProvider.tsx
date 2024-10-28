// src/components/providers/ClientProvider.tsx
'use client';

import { AuthProvider } from '../../lib/auth/AuthContext';

// Define your API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function ClientProvider({ children }: { children: React.ReactNode }) {
  console.log('API URL:', API_BASE_URL); // Debug log
  
  return (
    <AuthProvider apiBaseUrl={API_BASE_URL}>
      {children}
    </AuthProvider>
  );
}