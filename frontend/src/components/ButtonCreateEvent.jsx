import '../styles/ButtonCreateEvent.css'

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context.js';

import AddIcon from '@mui/icons-material/Add';

export default function ButtonCreateEvent(props){

  const { authenticate, user} = useContext(Context);

  const navigate = useNavigate();

  function navigateToCreateEvent(){
    if(authenticate){
      navigate('/create-event');
    }else{
      toast.error('Erro: Logue na plataforma');
    }
  }


  return (
    <div>
      <ToastContainer />
      <button title="Cria evento" onClick={() => {navigateToCreateEvent()}} id="active-btn">
        <AddIcon id="icon" />
      </button>
    </div>
  );
}