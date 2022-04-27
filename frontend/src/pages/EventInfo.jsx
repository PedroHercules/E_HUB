import { useState, useEffect, useContext } from 'react';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { Context } from '../context/Context.js';

import api from '../api.js';

import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../components/Header';
import ButtonCreateEvent from '../components/ButtonCreateEvent';

import '../styles/EventInfo.css';

export default function EventInfo(props) {
  const location = useLocation();
  const eventObj = location.state;
  const [event, setEvent] = useState({});
  const { authenticate, user } = useContext(Context);
  useEffect( () => {
    
    async function getEvent(){
      await api.get(`/event/${eventObj.id}}`,{
        params: {
          user: eventObj.userId
        }
      }).then(response => {
        setEvent(response.data.event);
      });
    }
    
    getEvent();
  }, []);


  const navigate = useNavigate();
  const toUpdateEvent = (eventObj) => {
    navigate(
      '/update-event',
      {state: eventObj}
    );
  }

  function navigateToCreateEvent(){
    if(authenticate){
      navigate('/create-event');
    }else{
      toast.error('Erro: Logue na plataforma');
    }
  }

  async function removeEvent(){
    let confirm = window.confirm(`Deseja deletar o evento ${event.title}?`);
    if(confirm){
      return await api.delete(`/event/delete/${eventObj.id}`)
      .then( () => {
        navigate('/')
      }).catch( (err) => {
        throw err.response.data;
      })
    }
  }

  function setDateLocal(date){
    return new Date(`${date}`).toLocaleString('pt-BR', { timeZone:  'America/Sao_Paulo'})
  }
  return (
    <div id="page-info">
      <Header />
      <ToastContainer />
      <section id="event-info">
        <div id="info-aside">
          <img src={eventObj.image} id="img" alt="Evento"/>
          <h2>{eventObj.title}</h2>
          <a id="link-event" href={event.link} target="_blank" rel="noreferrer">Ir para Evento</a>
          <div id="links-event">
            <button className="btn-link" id="btn-schedule">
              <AddCircleOutlineOutlinedIcon className="icon"/>
              Agendar Participação
            </button>
            {
              authenticate && user.id === eventObj.userId ?
              <div id="editEvent">
                <button className="btn-link" id="btn-update" onClick={()=>{toUpdateEvent(eventObj)}}>
                  <EditSharpIcon className="icon"/> 
                  Editar Evento
                </button>
                <button className="btn-link" id="btn-remove" onClick={() => {removeEvent()}}>
                  <RemoveCircleOutlineIcon className="icon"/>
                  Remover Evento
                </button>
              </div>:
              <div></div>
            }
            
          </div>
        </div>
        <div id="info-main">
          <h4>Sobre</h4>
          <p>{eventObj.about}</p>
          <div id="additional-info">
            <ul id="list-info">
              <li><span>Local: </span>{eventObj.local}</li>
              <li><span>Tipo: </span>{eventObj.type}</li>
              <li><span>Data Início: </span>{setDateLocal(eventObj.dateBegin)}</li>
              <li><span>Data Final: </span>{setDateLocal(eventObj.dateEnd)}</li>
              <li><span>Criador: </span>{eventObj.user.nickname}</li>
            </ul>
          </div>
        </div>
        
      </section>
      <ButtonCreateEvent onClick={() => {navigateToCreateEvent()}}/>
    </div>
  );
}