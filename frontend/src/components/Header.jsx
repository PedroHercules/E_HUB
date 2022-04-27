
import imgProfile from '../assets/perfil.png';

import LogoutIcon from '@mui/icons-material/Logout';

import { Link, useNavigate } from 'react-router-dom';

import {useContext} from 'react';

import { Context } from '../context/Context.js';

import '../styles/Header.css';


export default function Header(){
  const { handleLogout, authenticate, user } = useContext(Context);
  const navigate = useNavigate();

  function navigateToLogin(){
    navigate('/login');
  }

  return (
    <header>
      <h1> <Link id="link" to='/'>E_HUB</Link> </h1>
      
        {
          authenticate ?
          <div id="user-info">
            <div id="profile">
              <p>{user.nickname.toUpperCase()}</p>
            </div>
            <button id="logout" onClick={handleLogout}><LogoutIcon /></button>
          </div>
          
          : 
            <button id="btn-login" onClick={() => navigateToLogin()}>Entrar</button>
        }
      
    </header>
  );
}