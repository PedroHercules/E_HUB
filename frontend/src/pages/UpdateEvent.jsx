import { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';

import '../styles/CreateEvent.css';

import { Context } from '../context/Context.js';

import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  title: yup.string().required('O título é obrigatório'),
  description: yup.string().required('A descrição é obrigatória'),
  about: yup.string().required('Fale sobre o evento'),
  dateBegin: yup.date('Data inválida').required('Data de inicio é obrigatória'),
  dateEnd: yup.date('Data inválida').required('Data final é obrigatória'),
  local: yup.string().required('Local é obrigatório'),
  type: yup.string().required('Tipo é obrigatório'),
  image: yup.mixed().required('Selecione uma imagem')
}).required();

export default function CreateEvent(props){
  const location = useLocation();
  const event  = location.state;
  const { handleUpdateEvent, user} = useContext(Context);
  
  const { register, handleSubmit, setError, clearErrors, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();
  
  const updateEvent = async (data) => {
    const eventData = {
      "event": data,
      "user": user.nickname
    }

    await handleUpdateEvent(eventData)
      .catch(response => {
        setError('apiError', {message: response.error});
        toast.error(response.error);
      });

  }

  function setDate(date){
    date = date.toString().replace('Z','');
    date = new Date(`${date}+03:00`).toISOString().replace('Z','');
    return date;
  }
  
  
  return (
    <div id="create-event">
      <ToastContainer />
      <Header />
      <main>
        <h1>Editar Evento</h1>
        <form onSubmit={handleSubmit(updateEvent)}>
          <input type="number" name="userId" defaultValue={event.userId} {...register('userId')} hidden/>
          <input type="text" name="user" defaultValue={event.user} {...register('user')} hidden/>
          <input type="number" name="id" defaultValue={event.id} {...register('id')} hidden/>
          <div id="first-info">
            <label>Título</label>
            <input 
              type="text" 
              name="title" 
              placeholder="Ex: Tecnologias mais usadas no desenvolvimento web"
              defaultValue={event.title}
              {...register('title')}
              />
              {errors.title && toast.error(errors.title.message)}
            <label>Descrição</label>
            <input 
              type="text" 
              id="description" 
              name="description" 
              placeholder="Coloque aqui uma breve descrição do seu evento"
              defaultValue={event.description}
              {...register('description')}
              />
              {errors.description && <span>{errors.description.message}</span>}
            <label>Sobre</label>
            <textarea 
              id="about" 
              name="about" 
              placeholder="Coloque aqui uma descrição mais detalhada do evento"
              defaultValue={event.about}
              {...register('about')}
              />
              {errors.about && <span>{errors.about.message}</span>}
            <br />
            <label>Link do evento</label>
            <input type="url" name="link" placeholder="Coloque o link do evento aqui" {...register('link')} defaultValue={event.link}/>
            <label>Link da imagem</label>
            <input type="url" name="image" placeholder="Coloque o link de uma imagem" {...register('image')} defaultValue={event.image}/>
          </div>
          <div id="aside-info">
            <div className="info-event">
              <div id="date-inicio">
                <p>Data de início</p>
                <input type="datetime-local" name="dateBegin" {...register('dateBegin')} defaultValue={setDate(event.dateBegin)} />
                {errors.dateBegin && <span>{errors.dateBegin.message}</span>}
              </div>
              <div id="date-fim">
                <p>Data final</p>
                <input type="datetime-local" name="dateEnd" {...register('dateEnd')} defaultValue={setDate(event.dateEnd)}/>
                {errors.dateEnd && <span>{errors.dateEnd.message}</span>}
              </div>
            </div>

            <div className="info-event">
              <div id="local">
                <p>Local</p>
                <input type="text" name="local" placeholder="Ex: YouTube" {...register('local')} defaultValue={event.local}/>
                {errors.local && <span>{errors.local.message}</span>}
              </div>
              <div id="type">
                <p>Tipo</p>
                <input type="text" name="type" placeholder="Ex: Tecnologia" {...register('type')} defaultValue={event.type}/>
                {errors.type && <span>{errors.type.message}</span>}
              </div>
            </div>
            <div id="button-form">
              <button onClick={() => navigate(-1)} id="btn-cancel"> Cancelar </button>
              <Button type="submit" onClick={() => clearErrors()} text="Atualizar Evento"/>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}