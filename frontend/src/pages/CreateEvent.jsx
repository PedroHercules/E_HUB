import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '../components/Button';

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
  file: yup.mixed().required('Selecione uma imagem')
}).required();

export default function CreateEvent(){
  const { handleEvent } = useContext(Context);
  const { register, handleSubmit, setError, clearErrors, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });

  const registerEvent = async (data) => {
    const eventData = {
      "title": data.title,
      "description": data.description,
      "about": data.about,
      "dateBegin": data.dateBegin,
      "dateEnd": data.dateEnd,
      "local": data.local,
      "type": data.type,
      "file": data.file
    }

    await handleEvent(eventData)
      .then(() => {
        toast.success('Evento criado');
      })
      .catch(response => {
        setError('apiError', {message: response.error});
        toast.error(response.error);
      });


  }

  return (
    <div id="create-event">
      <ToastContainer />
      <Header />
      <main>
        <h1>Crie seu Evento</h1>
        <form onSubmit={handleSubmit(registerEvent)}>
          <label>Título</label>
          <input 
            type="text" 
            name="title" 
            placeholder="Ex: Tecnologias mais usadas no desenvolvimento web"
            {...register('title')}
            />
            {errors.title && toast.error(errors.title.message)}
          <label>Descrição</label>
          <input 
            type="text" 
            id="description" 
            name="description" 
            placeholder="Coloque aqui uma breve descrição do seu evento"
            {...register('description')}
            />
            {errors.description && <span>{errors.description.message}</span>}
          <label>Sobre</label>
          <textarea 
            id="about" 
            name="about" 
            placeholder="Coloque aqui uma descrição mais detalhada do evento"
            {...register('about')}
            />
            {errors.about && <span>{errors.about.message}</span>}
          <br />
          <div id="file-label">
            <label htmlFor="file" >Imagem</label>
            <input type="file" name="file" id="file" {...register('file')}/>
            <p>Coloque uma imagem do evento</p>
            {errors.file && toast.error(errors.file.message)}
          </div>
          <div className="info-event">
            <div id="date-inicio">
              <p>Data de início</p>
              <input type="date" name="dateBegin" {...register('dateBegin')}/>
              {errors.dateBegin && <span>{errors.dateBegin.message}</span>}
            </div>
            <div id="date-fim">
              <p>Data final</p>
              <input type="date" name="dateEnd" {...register('dateEnd')}/>
              {errors.dateEnd && <span>{errors.dateEnd.message}</span>}
            </div>
          </div>

          <div className="info-event">
            <div id="local">
              <p>Local</p>
              <input type="text" name="local" placeholder="Ex: YouTube" {...register('local')}/>
              {errors.local && <span>{errors.local.message}</span>}
            </div>
            <div id="type">
              <p>Tipo</p>
              <input type="text" name="type" placeholder="Ex: Tecnologia" {...register('type')}/>
              {errors.type && <span>{errors.type.message}</span>}
            </div>
          </div>
          <div id="button-form">
            <Link to="/" id="btn-cancel"> Cancelar </Link>
            <Button type="submit" onClick={() => clearErrors()} text="Criar Evento"/>
          </div>
        </form>
      </main>
    </div>
  );
}