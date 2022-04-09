import { useContext } from 'react';
import { Context } from '../context/Context.js';

import Header from '../components/Header';

import '../styles/Home.css';

export function Home() {

  const { handleLogout, authenticate, user } = useContext(Context);
  return (
    <div id="home-page">
      <Header />
      <main>
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

        <a href="/create-event">Criar evento</a>
      </main>
    </div>
  );
}