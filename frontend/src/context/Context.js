import { createContext } from 'react';

import useAuth from '../hooks/useAuth.js';

const Context = createContext();

function AuthProvider({ children }) {
  const { authenticate, handleLogin, handleLogout, handleRegister, user } = useAuth();

  return (
    <Context.Provider value = { { authenticate, handleLogin, handleLogout, handleRegister, user } }>
      { children }
    </Context.Provider>
  );
}

export { Context, AuthProvider };