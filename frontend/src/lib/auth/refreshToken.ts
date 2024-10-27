// src/lib/auth/refreshToken.ts
'use client';

import { useAuth } from './AuthContext';

interface RefreshOptions {
  requireAuth?: boolean;
  redirectTo?: string;
}

export async function refreshToken(options: RefreshOptions = {}) {
  const auth = useAuth();
  const { requireAuth = false, redirectTo = '/login' } = options;

  try {
    if (!auth.refreshToken) {
      if (requireAuth) {
        window.location.href = redirectTo;
      }
      return null;
    }

    return await auth.refreshAccessToken();
  } catch (error) {
    if (requireAuth) {
      window.location.href = redirectTo;
    }
    return null;
  }
}