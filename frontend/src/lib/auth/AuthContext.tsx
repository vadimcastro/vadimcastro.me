// src/lib/auth/AuthContext.tsx
"use client";
import { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState } from './types';
import { useRouter } from 'next/navigation';
import { useToast } from '../../components/ui/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'SET_LOADING' }
  | { type: 'SET_USER'; payload: { user: User; token: string } }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: true, error: null };
    case 'SET_USER':
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'SET_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      return { user: null, token: null, isLoading: false, error: null };
    default:
      return state;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isLoading: true,
    error: null,
  });
  
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      verifyToken(token);
    } else {
      dispatch({ type: 'SET_LOADING' });
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/verify-token', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: 'SET_USER',
          payload: { user: data.user, token }
        });
      } else {
        localStorage.removeItem('auth_token');
        dispatch({ type: 'LOGOUT' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Authentication failed' });
    }
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('auth_token', data.access_token);
      dispatch({
        type: 'SET_USER',
        payload: { user: data.user, token: data.access_token }
      });

      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
      });

      router.push('/dashboard');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Invalid credentials' });
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:8000/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${state.token}`
        }
      });
    } finally {
      localStorage.removeItem('auth_token');
      dispatch({ type: 'LOGOUT' });
      router.push('/login');
      toast({
        title: "Logged out",
        description: "Successfully logged out.",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};