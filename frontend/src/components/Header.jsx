
import imgProfile from '../assets/perfil.png';
import '../styles/Header.css';
import { Link } from 'react-router-dom';

export default function Header(){
  return (
    <header>
      <h1> <Link id="link" to='/'>E_HUB</Link> </h1>
      <div id="profile">
        <p>Usuário</p>
        <img src={imgProfile} alt="Perfil" />
      </div>
    </header>
  );
}