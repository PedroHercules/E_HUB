
import api from '../api';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditIcon from '@mui/icons-material/Edit';

import { toast, ToastContainer } from 'react-toastify';

import { Context } from '../context/Context.js';


import Header from '../components/Header';
import ButtonCreateEvent from '../components/ButtonCreateEvent';
import EditUser from '../components/EditUser';

import '../styles/Profile.css';

import "react-toastify/dist/ReactToastify.css";

export default function Profile(){
  const { authenticate, user } = useContext(Context);
  const [ owner, setOwner ] = useState({});
  const [ events, setEvents ] = useState([]);
  const [ schedules, setSchedules ] = useState([]);

  const navigate = useNavigate();

  useEffect( () => {
    async function getOwnerProfile(){
      await api.get(`/user/profile/${user.id}`)
        .then( (response) => {
          setOwner(response.data.user);
          if (response.data.user.events){
            setEvents(response.data.user.events)
          }

          if(response.data.user.schedules) {
            setSchedules(response.data.user.schedules)
          }
        } )
    }

    getOwnerProfile();
  }, [owner]);

  function setDateLocal(date){
    return new Date(`${date}`).toLocaleString('pt-BR', { timeZone:  'America/Sao_Paulo'})
  }

  function navigateToEventInfo(event){
    if (!event) {
      toast.error('Este evento não existe mais');
      return;
    }
    navigate(`/event/${event.id}`, { state: event });
  }

  async function removeEvent(event){
    let confirm = window.confirm(`Deseja deletar o evento ${event.title}?`);
    if(confirm){
      return await api.delete(`/event/delete/${event.id}`)
      .then( () => {
        navigate(`/profile/${user.nickname}`);
      }).catch( (err) => {
        throw err.response.data;
      })
    }
  }

  async function removeScheduleEvent(schedule){
    let confirm = window.confirm(`Deseja deletar o evento agendado ${schedule.title}?`);
    if(confirm){
      return await api.delete(`/event/schedule-delete/${schedule.id}`)
      .then( () => {
        navigate(`/profile/${user.nickname}`);
      }).catch( (err) => {
        throw err.response.data;
      })
    }
  }

  const toUpdateEvent = (event) => {
    navigate(
      '/update-event',
      {state: event}
    );
  }

  return (
    <div id="profile-page">
      <Header />
      <section id="profile-info">
        <aside id="profile-user">
          <h2>{owner.nickname}</h2>
          <br />
          <h4>Contato</h4>
          <p>{owner.email}</p>
          <br />
          <h4>Sobre</h4>
          <p>{owner.about}</p>
          <br />
          
          <EditUser user={owner}/>
        </aside>
        <main id="profile-events">
          <div id="created-events">
            <h2>Eventos criados</h2>
            <div className="columns">
              <span>Título</span>
              <span>Início</span>
              <span>Final</span>
              <span>Ação</span>
            </div>
            <div className="group-row">
              {
                events.length > 0 ? (
                  events.map( (event, index) => (
                    <div className="row">
                      <span>{event.title}</span>
                      <span>{setDateLocal(event.dateBegin)}</span>
                      <span>{setDateLocal(event.dateEnd)}</span>
                      <span className="actions">
                        <button className="btn-actions view" title="Visualizar evento" onClick={() => {navigateToEventInfo(event)}}> <OpenInNewIcon className="icon-btn"/> </button>
                        <button className="btn-actions view" title="Visualizar evento" onClick={() => {toUpdateEvent(event)}}> <EditIcon className="icon-btn"/> </button>
                        <button className="btn-actions remove" title="Remover evento" onClick={() => {removeEvent(event)}}> <RemoveCircleOutlineIcon className="icon-btn"/> </button>
                      </span>
                    </div>
                  ))
                ) : (
                  <h4>Não há eventos criados</h4>
                )
              }
            </div>
              
          </div>
          
          <div id="schedule-events">
            <h2>Eventos agendados</h2>
            <div className="columns">
              <span>Título</span>
              <span>Início</span>
              <span>Final</span>
              <span>Ação</span>
            </div>
            <div className="group-row">
              {
                schedules.length > 0 ? (
                  schedules.map( (schedule, index) => (
                    <div className="row" key={index}>
                      <span>{schedule.title}</span>
                      <span>{schedule.beginDate}</span>
                      <span>{schedule.endDate}</span>
                      <span className="actions">
                      <button className="btn-actions view" title="Visualizar evento" onClick={() => {navigateToEventInfo(schedule.event)}}> <OpenInNewIcon className="icon-btn"/> </button>
                      <button className="btn-actions remove" title="Remover evento" onClick={() => {removeScheduleEvent(schedule)}}> <RemoveCircleOutlineIcon className="icon-btn"/> </button>
                      </span>
                    </div>
                  ))
                ) : (
                  <h4>Não há eventos agendados</h4>
                )
              }
            </div> 
          </div>
        </main>
      </section>
      <ButtonCreateEvent />
    </div>
  );

}