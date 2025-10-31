'use client';

import { createContext, useContext, useState } from 'react';

const RequestContext = createContext({
  request: null,
  setRequest: (_request) => {},
});

export const RequestContextProvider = ({ children }) => {
  const [request, setRequest] = useState(null);

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
