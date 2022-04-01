import { Link } from "react-router-dom";

import { BannerAside } from "../../components/BannerAside";
import { Button } from "../../components/Button";

import '../../styles/Login.css';

export function Register() {
  return (
    <div id="page-auth">
      <main>
        <div id="title-login">
          <h1>E_HUB</h1>
          <h3>Acesse sua conta</h3>
        </div>

        <form>
          <input type="text" placeholder="Nome de usuário" name="username"/>
          <input type="email" placeholder="E-mail" name="email"/>
          <input type="password" placeholder="Senha" name="password"/>
          <Button type="submit" text="Registrar"/>
        </form>
        <br />
        <p>Já possui um conta? <Link to='/login'>Entre já</Link></p>
      </main>
      <BannerAside />
    </div>
  );
}