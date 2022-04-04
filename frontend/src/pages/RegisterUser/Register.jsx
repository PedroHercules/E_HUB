import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

import { BannerAside } from "../../components/BannerAside";
import { Button } from "../../components/Button";

import { Context } from '../../context/Context.js';

import '../../styles/Login.css';
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  nickname: yup.string().required('Esse campo é obrigatório'),
  email: yup.string().email('E-mail inválido').required('Esse campo é obrigatório'),
  password: yup.string()
    .required('Esse campo é obrigatório')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .matches(/^(?=.*[A-Z]){1}.*$/, 'Pelo menos uma letra maiúscula')
    .matches(/^(?=.*[a-z]){1}.*$/, 'Pelo menos uma letra minúscula')
    .matches(/^(?=.*[0-9]){1}.*$/, 'Pelo menos um número')
    .matches(/^(?=.*[@#$%&*!?]){1}.*$/, 'Pelo menos um caractere especial')
}).required();

export default function Register() {
  const { handleRegister } = useContext(Context);

  const { register, handleSubmit, setError, clearErrors, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });


  const registerUser = async (data) => {
    const userData = {
      "nickname": data.nickname,
      "email": data.email,
      "password": data.password
    }

    await handleRegister(userData)
      .catch(response => {
        setError('apiError', {message: response.error});
        toast.error(response.error);
      });
  }

  return (
    <div id="page-auth">
      <ToastContainer />
      <main>
        <div id="title-login">
          <h1>E_HUB</h1>
          <h3>Acesse sua conta</h3>
        </div>

        <form onSubmit={handleSubmit(registerUser)}>
          <input 
            type="text" 
            placeholder="Nome de usuário" 
            name="username"
            {...register('nickname')}
          ></input>
          {errors.nickname && <span>{errors.nickname.message}</span>}
          <input 
            type="email" 
            placeholder="E-mail" 
            name="email"
            {...register('email')}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <input 
            type="password" 
            placeholder="Senha" 
            name="password"
            {...register('password')}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <Button type="submit" onClick={() => clearErrors()} text="Registrar"/>
        </form>
        <br />
        <p>Já possui um conta? <Link to='/login'>Entre já</Link></p>
      </main>
      <BannerAside />
    </div>
  );
}