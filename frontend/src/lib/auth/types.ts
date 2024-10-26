// src/lib/auth/types.ts
export interface User {
    id: string;
    email: string;
    name?: string;
    isAdmin: boolean;
  }
  
  export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    token: string | null;
  }