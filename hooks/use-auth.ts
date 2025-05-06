import { useState } from 'react';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface LoginData {
  email: string;
  password: string;
  role: string;
}

interface AuthResponse {
  success: boolean;
  error?: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const register = async (data: RegisterData): Promise<AuthResponse> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }
      
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred during registration';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
  
  const login = async (data: LoginData): Promise<AuthResponse> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }
      
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred during login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    register,
    login,
    isLoading,
    error,
  };
};

export default useAuth; 