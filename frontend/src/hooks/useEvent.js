
import { useNavigate } from 'react-router-dom';

import api from '../api.js';

export default function useEvent(){

  const navigate = useNavigate();

  async function handleCreateEvent( { title, description, about, dateBegin, dateEnd, local, link, type, image, user } ){
    return await api.post('event/create', {
      "title": title,
      "description": description,
      "about": about,
      "dateBegin": dateBegin,
      "dateEnd": dateEnd,
      "local": local,
      "link": link,
      "type": type,
      "image": image,
      "user": user
    }).then( response => {
      navigate(`/`);
    }).catch(err => {
      throw err.response.data;
    });
  }

  async function handleUpdateEvent( { event, user } ){
    return await api.post('event/update', {
      "id": event.id,
      "title": event.title,
      "description": event.description,
      "about": event.about,
      "dateBegin": event.dateBegin,
      "dateEnd": event.dateEnd,
      "local": event.local,
      "link": event.link,
      "type": event.type,
      "image": event.image,
      "userId": event.userId
    }).then( (response) => {
      console.log(event)
      navigate(`/profile/${user}`);
    }).catch(err => {
      throw err.response.data;
    });
  }

  return { handleCreateEvent, handleUpdateEvent };
}