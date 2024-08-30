// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Create Provider Component
const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null
  });

  const login = (user) => {
    setAuthState({ isAuthenticated: true, user });
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
  };

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Perform your authentication logic here
      setAuthState({ isAuthenticated: true, user: {/* user data */} });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
