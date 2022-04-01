
import { Link } from 'react-router-dom';

import '../../styles/Login.css';

import { Button } from '../../components/Button';
import { BannerAside } from '../../components/BannerAside';


export function Login(){
  return (
    <div id="page-auth">

      <main>
        <div id="title-login">
          <h1>E_HUB</h1>
          <h3>Acesse sua conta</h3>
        </div>

        <form>
          <input type="text" placeholder="Nome de usuário" name="username"/>
          <input type="password" placeholder="******" name="password"/>
          <Button type="submit" text="Entrar"/>
        </form>
        <br />
        <p>Ainda não possui uma conta? <Link to="/registerUser">Crie uma conta</Link></p>
        <br />
        <p>Esqueceu a senha? <Link to="/login">Altere aqui</Link></p>
      </main>

      <BannerAside />
    </div>
  );
}