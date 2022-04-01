import authImage from '../assets/auth-image.png';

import '../styles/BannerAside.css';

export function BannerAside (){
  return (
    <aside>
      <img src={authImage} alt="Calendário" />
      <h2>Crie, Compartilhe e Agende Eventos!</h2>
    </aside>
  );
}