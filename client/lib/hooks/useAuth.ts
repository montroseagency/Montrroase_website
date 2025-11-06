import { useContext } from 'react';
import { AuthContext } from '@/lib/auth-context';
import type { AuthContextType } from '@/lib/types';

/**
 * Custom hook to use authentication context
 * Must be used within AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext as any);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
