import { useNavigate } from 'react-router-dom';

import api from '../api.js';

export default function useEvent(){

  const navigate = useNavigate();

  async function handleEvent( { title, description, about, dateBegin, dateEnd, local, type, file } ){
    console.log(file)
    return await api.post('event/create', {
      "title": title,
      "description": description,
      "about": about,
      "dateBegin": dateBegin,
      "dateEnd": dateEnd,
      "local": local,
      "type": type,
      "file": file
    }).then( response => {
      navigate('/');
    }).catch(err => {
      throw err.response.data;
    });
  }

  return { handleEvent };
}