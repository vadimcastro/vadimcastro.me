// src/components/providers/ClientProvider.tsx
'use client';

import { AuthProvider } from '../../lib/auth/AuthContext';

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}