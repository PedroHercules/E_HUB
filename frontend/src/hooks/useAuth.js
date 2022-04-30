import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api.js';

export default function useAuth(){
  const [ authenticate, setAuthenticate ] = useState(false);
  const [ user, setUser ] = useState(null);

  const navigate = useNavigate();
  
  useEffect( () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      api.defaults.headers.User = JSON.stringify(user);
      setUser(JSON.parse(user));
      setAuthenticate(true);
    }
  }, []);

  async function handleRegister( { nickname, email, password } ) {
    return await api.post('/user/register', {
      "nickname": nickname, 
      "email": email,
      "password": password
    }).then( response => {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      localStorage.setItem('user', JSON.stringify(response.data.user));
      api.defaults.headers.User = JSON.stringify(response.data.user);

      setUser(response.data.user);
      
      navigate('/login');
    }).catch(err => {
      throw err.response.data;
    });
  }

  async function handleUpdateUser({ id, nickname, about, email }){
    console.log(about)
    return await api.post('/user/update', {
      "id": id,
      "nickname": nickname,
      "about": about,
      "email": email
    }).then(() => {
      navigate(`/profile/${nickname}`)
    });
  }

  async function handleLogin({ nickname, password }){
    await api.post('/user/authenticate', {
      "nickname": nickname,
      "password": password
    }).then(response => {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      localStorage.setItem('user', JSON.stringify(response.data.user));
      api.defaults.headers.Authorization = `Bearer ${response.data.user}`;

      setUser(response.data.user);
      setAuthenticate(true);
      navigate('/');
    }).catch(err => {
      throw err.response.data;
    });
  }

  function handleLogout() {
    setAuthenticate(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    api.defaults.headers.Authorization = undefined;

    navigate('/login');
  }

  return { authenticate, handleLogin, handleLogout, handleRegister, handleUpdateUser, user };
}