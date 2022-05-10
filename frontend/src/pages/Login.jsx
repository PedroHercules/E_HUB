import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Context } from '../context/Context.js';

import '../styles/Login.css';

import Button from '../components/Button';
import { BannerAside } from '../components/BannerAside';


const schema = yup.object().shape({
  nickname: yup.string().required('Esse campo é obrigatório'),
  password: yup.string().required('Esse campo é obrigatório')
}).required();

export function Login(){

  const { register, handleSubmit, setError, clearErrors, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });

  const { handleLogin } = useContext(Context);

  function authenticateUser(data,e){
    e.preventDefault();
    const userData = {
      "nickname": data.nickname,
      "password": data.password
    }
    handleLogin(userData).catch(response => {
      setError('apiError', {message: response.error});
      toast.error(response.error);
    });
  }

  return (
    <div id="page-auth">
      <main id="info-user">
        <div id="title-login">
          <h1>E_HUB</h1>
          <h3>Acesse sua conta</h3>
        </div>

        <form onSubmit={handleSubmit(authenticateUser)}>
          <input 
            type="text" 
            placeholder="Nome de usuário" 
            name="username"
            {...register('nickname')}
          />
          {errors.nickname && <span>{errors.nickname.message}</span>}
          <input 
            type="password" 
            placeholder="******" 
            name="password"
            {...register('password')}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <Button type="submit" text="Entrar" onClick={() => clearErrors}/>
        </form>
        <br />
        <p>Ainda não possui uma conta? <Link to="/registerUser">Crie uma conta</Link></p>
        <br />
        {/* <p>Esqueceu a senha? <Link to="/login">Altere aqui</Link></p> */}
      </main>

      <BannerAside />
    </div>
  );
}