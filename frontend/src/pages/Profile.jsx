
import {useContext} from 'react';
import { Context } from '../context/Context.js';


import Header from '../components/Header';
import ButtonCreateEvent from '../components/ButtonCreateEvent';

import '../styles/Profile.css';

export default function Profile(){
  const { authenticate, user } = useContext(Context);
  return (
    <div id="profile-page">
      <Header />
      <section id="profile-info">
        <aside id="profile-user">
          <h2>{user.nickname}</h2>
          <p>Software Developer Intern at InspireIP</p>
          <p>HTML | CSS | JavaScript | NodeJs | ReactJs | VueJs</p>
        </aside>
        <main id="profile-events">
          <table id="created-events">
            <h2>Eventos criados</h2>
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
            </tr>
          </table>
          
          <table id="schedule-events">
            <h2>Eventos agendados</h2>
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
            </tr>
          </table>
        </main>
      </section>
      <ButtonCreateEvent />
    </div>
  );
}