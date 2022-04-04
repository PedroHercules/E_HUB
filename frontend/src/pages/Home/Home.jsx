import { useContext } from 'react';
import { Context } from '../../context/Context.js';

export function Home() {

  const { handleLogout, authenticate, user } = useContext(Context);
  return (
    <div>
      <h1>Home</h1>
      {
        (authenticate===true)?
        <div>
          <h3>{user.nickname}</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
        :
        <a href="/login">Login</a>
      }
    </div>
  );
}