'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ISP } from '../types';

interface AuthContextType {
  isp: ISP;
  setIsp: (newIsp: Partial<ISP> | ((prev: ISP) => ISP)) => void;
  clearIsp: () => void;
}

const initialIsp: ISP = {
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  logo: '',
  createdAt: '',
  updatedAt: '',
};

export const AuthContext = createContext<AuthContextType>({
  isp: initialIsp,
  setIsp: () => {},
  clearIsp: () => {},
});

const ISP_STORAGE_KEY = 'feedbackNet_isp';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isp, setIspState] = useState<ISP>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const savedIsp = localStorage.getItem(ISP_STORAGE_KEY);
      return savedIsp ? (JSON.parse(savedIsp) as ISP) : initialIsp;
    }
    return initialIsp;
  });

  // Update localStorage and cookies when isp changes
  useEffect(() => {
    if (typeof window !== 'undefined' && isp.id) {
      localStorage.setItem(ISP_STORAGE_KEY, JSON.stringify(isp));
      // También guardamos en cookie para el SSR
      document.cookie = `isp=${JSON.stringify(isp)}; path=/; max-age=86400; SameSite=Lax; Secure`;
    }
  }, [isp]);

  // Create a stable setIsp function
  const setIsp: AuthContextType['setIsp'] = (newIsp) => {
    setIspState((prev) => {
      const update = typeof newIsp === 'function' ? newIsp(prev) : newIsp;
      return { ...prev, ...update };
    });
  };

  const clearIsp = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ISP_STORAGE_KEY);
      document.cookie = 'isp=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
    setIspState(initialIsp);
  };

  return (
    <AuthContext.Provider
      value={{
        isp,
        setIsp,
        clearIsp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
