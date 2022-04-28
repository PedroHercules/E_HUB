import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context.js';


import api from '../api';

import Header from '../components/Header';
import ButtonCreateEvent from '../components/ButtonCreateEvent';

import '../styles/Home.css';


export function Home() {

  const [events, setEvents] = useState([]);

  const { user } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    async function getAllEvents(){
      await api.get('/event/all').then(response => {
        setEvents(response.data.allEvents);
      });
    }
    getAllEvents();
  }, [])

  function navigateToEventInfo(id, event){
    navigate(`/event/${id}`, { state: event });
  }

  async function handleSearch(search){
    await api.post('/event/search', {
      'search': search,
      "user": user.id
    })
      .then(response => {
        setEvents(response.data.events);
      })
  }

  return (
    <div id="home-page">
      <Header />
      <section>
        <div id="home-aside">
          {/* <button className="active-btn"onClick={() => {navigateToCreateEvent()}}>
            <AddIcon className="icon" />
            Criar evento
          </button> */}
          <div id="search">
              <input 
              type="search" 
              id="input-search" 
              name="search" 
              placeholder="Pesquise um evento"
              onChange={(e) => {handleSearch(e.target.value)}}/>
          </div>

          
        </div>
       
        <div id="home-main">
          {events.map((event, index) => (
            <div onClick={() => navigateToEventInfo(index, event)} id="cardEvent" key={index} >
              <img id="img-event" src={event.image} alt="event" />
              <div id="infoCardEvent">
                <h4>{event.title}</h4>
                <p>{event.description}</p>
              </div>
              <p id="user">Por <span>{event.user.nickname}</span></p>
            </div>
          ))}
        </div>
      </section>
      <ButtonCreateEvent />
    </div>
  );
}