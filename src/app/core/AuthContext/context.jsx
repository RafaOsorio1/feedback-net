'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  isp: {
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
  },
  setIsp: (_isp) => {},
  clearIsp: () => {},
});

const ISP_STORAGE_KEY = 'feedbackNet_isp';

export const AuthProvider = ({ children }) => {
  const [isp, setIspState] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const savedIsp = localStorage.getItem(ISP_STORAGE_KEY);
      return savedIsp
        ? JSON.parse(savedIsp)
        : {
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
    }
    return {
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
  });

  // Update localStorage when isp changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ISP_STORAGE_KEY, JSON.stringify(isp));
    }
  }, [isp]);

  // Create a stable setIsp function
  const setIsp = (newIsp) => {
    setIspState((prev) => ({
      ...prev,
      ...(typeof newIsp === 'function' ? newIsp(prev) : newIsp),
    }));
  };

  console.log('isp', isp);

  return (
    <AuthContext.Provider
      value={{
        isp,
        setIsp,
        clearIsp: () => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem(ISP_STORAGE_KEY);
          }
          setIspState({
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
          });
        },
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
