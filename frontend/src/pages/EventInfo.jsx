import { useState, useEffect, useContext } from 'react';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { toast } from 'react-toastify';

import { Context } from '../context/Context.js';

import api from '../api.js';

import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import ButtonCreateEvent from '../components/ButtonCreateEvent';

import '../styles/EventInfo.css';

export default function EventInfo() {
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

  async function handleScheduleEvent() {
    return await api.post('/event/schedule', {
      eventId: eventObj.id,
      userId: user.id,
      title: eventObj.title,
      description: eventObj.description,
      beginDate: setDateLocal(eventObj.dateBegin),
      endDate: setDateLocal(eventObj.dateEnd)
    }).then( () => {
      toast.success('Evento agendado')
    }).catch( () => {
      toast.error('Você já agendou este evento')
    })
  }

  function setDateLocal(date){
    return new Date(`${date}`).toLocaleString('pt-BR', { timeZone:  'America/Sao_Paulo'})
  }
  return (
    <div id="page-info">
      <Header />
      <section id="event-info">
        <div id="info-aside">
          <img src={eventObj.image} id="img" alt="Evento"/>
          <h2>{eventObj.title}</h2>
          <a id="link-event" href={eventObj.link} target="_blank" rel="noopener noreferrer">Ir para Evento</a>
          <div id="links-event">
            <button className="btn-link" id="btn-schedule" onClick={handleScheduleEvent}>
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
      <ButtonCreateEvent/>
    </div>
  );
}