import '../styles/ButtonCreateEvent.css'

import AddIcon from '@mui/icons-material/Add';

export default function ButtonCreateEvent(props){
  return (
    <button id="active-btn" onClick={props.onClick}>
      <AddIcon id="icon"/>
      Criar evento
    </button>
  );
}