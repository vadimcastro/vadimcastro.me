// src/lib/api/types.ts
export interface ApiError {
    message: string;
    status: number;
  }
  
  export interface ApiResponse<T> {
    data: T | null;
    error: ApiError | null;
    loading: boolean;
  }