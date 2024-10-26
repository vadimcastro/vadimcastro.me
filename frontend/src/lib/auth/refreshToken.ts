// src/lib/auth/refreshToken.ts
import { useAuth } from './AuthContext';

const REFRESH_TOKEN_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

export const useRefreshToken = () => {
  const { refreshToken } = useAuth();

  const setupRefreshToken = (expiresIn: number) => {
    // Calculate when to refresh the token
    const refreshTime = expiresIn - REFRESH_TOKEN_THRESHOLD;
    
    // Set up timer to refresh token
    setTimeout(async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    }, refreshTime);
  };

  return { setupRefreshToken };
};