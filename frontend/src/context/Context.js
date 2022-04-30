import { createContext } from 'react';

import useAuth from '../hooks/useAuth.js';
import useEvent from '../hooks/useEvent.js';

const Context = createContext();

function AuthProvider({ children }) {
  const { authenticate, handleLogin, handleLogout, handleRegister, handleUpdateUser, user } = useAuth();
  const { handleCreateEvent, handleUpdateEvent } = useEvent();

  return (
    <Context.Provider value = { { authenticate, handleLogin, handleLogout, handleRegister, handleCreateEvent, handleUpdateEvent, handleUpdateUser, user } }>
      { children }
    </Context.Provider>
  );
}

export { Context, AuthProvider };