import { Router } from 'express';
import Event from '../database/Event.js';
import User from '../database/User.js';
import {Op} from 'sequelize';

const router = Router();

async function checkEvent(title){
  const event = await Event.findOne({ where: { title: title } });
  return event;
}

router.post('/create', async (req, res) => {
  try {
    const { user, title, description, about, dateBegin, dateEnd, local, link, type, image } = req.body;
    if (await checkEvent(title)){
      return res.status(400).send({ error: 'Este evento já existe' })
    }

    const event = await Event.create({
      title: title,
      description: description,
      about: about,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      type: type,
      link: link,
      local: local,
      image: image,
      userId: user
    });

    return res.status(200).send({ event });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Erro ao criar evento' })
  }
});

router.post('/update', async (req, res) => {
  try {
    const { id, title, description, about, dateBegin, dateEnd, local, link, type, image, userId} = req.body;
    const event = await Event.update({
      title: title,
      description: description,
      about: about,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      type: type,
      link: link,
      local: local,
      image: image
    }, 
    {where: {id: id}},
    {
      include: [
        {
          model: User,
          where: {id: userId}
        }
      ]
    })

    return res.status(200).send({ event });
  } catch (err) {
    console.error(err);
    console.log(err)
    return res.status(400).send({ error: 'Erro ao atualizar evento' })
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    await Event.destroy({ where: {id: id}});

    return res.status(200).send({message: 'Evento removido'});
  } catch (err) {
    console.error(err)
    return res.status(400).send({message: 'Erro ao remover evento'});
  }
});


router.get('/all', async (req, res) => {
  const userId = req.body.user;
  try {
    const allEvents = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ['nickname']
        }
      ]
    });
    return res.status(200).send( { allEvents });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao carregar todos os eventos'})
  }
});

router.post('/search', async (req, res) => {
  try {
    const {search, user} = req.body;
    const events = await Event.findAll(
      {
      where: {
        title: {
          [Op.like]: "%" + search + "%"
        }
      },
      include: [
        {model: User}
      ]
    });

    if (events == {}){
      return res.status(400).send({ error: "Evento não encontrado" });
    }

    return res.status(200).send({ events });
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: "Erro ao pesquisar evento" });
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = req.query.user
    console.log(user);
    const event = await Event.findOne({
      include: [
        {
          model: User,
          where: {id: user}
        }
      ]},
      { where: {id: req.params.id} }
    );
    if(!event){
      return res.status(404).send({ error: 'Evento não encontrado'});
    }
    
    
    return res.status(200).send({ event });
  } catch (err) {
    return res.status(404).send({ error: 'Erro ao acessar rota de evento'});
  }
});

export default router;