import { Router } from 'express';
import Event from '../database/Event.js';

const router = Router();

async function checkEvent(title){
  const event = await Event.findOne({ where: { title: title } });
  return event;
}

router.post('/create', async (req, res) => {
  try {
    const { title, description, about, dateBegin, dateEnd, time, local, type, file } = req.body;
    console.log(file)
    if (await checkEvent(title)){
      return res.status(400).send({ error: 'Este evento já existe' })
    }

    const event = await Event.create({
      title: title,
      description: description,
      about: about,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      time: time,
      type: type,
      local: local,
      image: file
    });

    return res.status(200).send({ event });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao criar evento' })
  }
});

router.get('/all', async (req, res) => {
  try {
    const allEvents = await Event.findAll();
    return res.status(200).send( { allEvents });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao carregar todos os eventos'})
  }
})

export default router;