'use client';

import React, { createContext, useContext, useState } from 'react';
import { RequestDetail } from '../types';

interface RequestContextType {
  request: RequestDetail | null;
  setRequest: (request: RequestDetail | null) => void;
}

const RequestContext = createContext<RequestContextType>({
  request: null,
  setRequest: () => {},
});

export const RequestContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [request, setRequest] = useState<RequestDetail | null>(null);

  return (
    <RequestContext.Provider value={{ request, setRequest }}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequestContext = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error(
      'useRequestContext must be used within a RequestContextProvider',
    );
  }
  return context;
};
