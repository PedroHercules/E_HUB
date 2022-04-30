
import api from '../api';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Context } from '../context/Context.js';


import Header from '../components/Header';
import ButtonCreateEvent from '../components/ButtonCreateEvent';
import EditUser from '../components/EditUser';

import EditIcon from '@mui/icons-material/Edit';

import '../styles/Profile.css';

export default function Profile(){
  const { authenticate, user } = useContext(Context);
  const [ owner, setOwner ] = useState({});
  const [ events, setEvents ] = useState([]);

  const navigate = useNavigate();

  useEffect( () => {
    async function getOwnerProfile(){
      await api.get(`/user/profile/${user.id}`)
        .then( (response) => {
          setOwner(response.data.user);
          if (response.data.user.events){
            setEvents(response.data.user.events)
          }
        } )
    }

    getOwnerProfile();
  }, [owner]);

  function setDateLocal(date){
    return new Date(`${date}`).toLocaleString('pt-BR', { timeZone:  'America/Sao_Paulo'})
  }

  function navigateToEventInfo(id, event){
    navigate(`/event/${id}`, { state: event });
  }

  function navigateToEditUser(){
    navigate('/profile/edit');
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
          {/* <button id="btn-update-user" onClick={() => {navigateToEditUser()}}>
            <EditIcon className="icon"/>
            Editar
          </button> */}
          <EditUser user={owner}/>
        </aside>
        <main id="profile-events">
          <div id="created-events">
            <h2>Eventos criados</h2>
            <table>
              <tr>
                <th>Título</th>
                <th>Início</th>
                <th>Fim</th>
                <th>Ação</th>
              </tr>
              {
                events.map( (event, index) => (
                  <tr>
                    <td>{event.title}</td>
                    <td>{setDateLocal(event.dateBegin)}</td>
                    <td>{setDateLocal(event.dateEnd)}</td>
                    <td id="actions">
                      <button onClick={() => {navigateToEventInfo(index, event)}}>Ver evento</button>
                    </td>
                  </tr>
                ))
              }
              
            </table>
          </div>
          
          {/* <div id="schedule-events">
            <h2>Eventos agendados</h2>
            <table>
              <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Início</th>
                <th>Fim</th>
                <th>Ação</th>
              </tr>
              <tr>
                <td>Javascript</td>
                <td>Aula básica de Javascript</td>
                <td>07/08/2022 14:00</td>
                <td>07/08/2022 16:00</td>
                <td>
                  <button>Editar</button>
                  <button>Excluir</button>
                  <button>Ir</button>
                </td>
              </tr>
            </table>
          </div> */}
        </main>
      </section>
      <ButtonCreateEvent />
    </div>
  );

}