import { Router } from 'express';
import User from '../database/User.js';
import Event from '../database/Event.js';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import mailer from '../modules/mailer.js';

import 'dotenv/config';

const router = Router();

function generateToken(params = {}){
  return jwt.sign(params, process.env.SECRET, {
    expiresIn: 86400,
  });
}

async function checkUserExist(nickname, email){
  const user = await User.findOne({ where: { [Op.or]: [{nickname: nickname}, {email: email}] } });
  return user;
}

router.post('/register', async (req, res) => {
  try {
    let { nickname, email, password } = req.body;

    const existUser = await checkUserExist(nickname, email);
    

    if(existUser){
      let message = 'Nome de usuário e e-mail já existem';
      if(existUser.nickname == nickname && existUser.email != email){
        message = 'Nome de usuário já existe';
      }else if (existUser.nickname != nickname && existUser.email == email){
        message = 'E-mail já existe';
      }
      return res.status(400).send({
        error: message
      });
    }
    
    const user = await User.create(
      {
        nickname: nickname,
        email: email,
        password: password
      }
    );
    password = undefined;
    user.password = undefined;

    return res.status(200).send({
      user,
      token: generateToken({id: user.id})
    });
    
  } catch (error) {
    return res.status(400).send({
      error: `ERROR: ${error}`
    });
  }
});

router.post('/authenticate', async (req, res) => {
  try{
    let {nickname, password} = req.body;

    const user = await User.findOne({
      where: {
        nickname: nickname
      }
    });

    if (!user){
      return res.status(400).send({
        error: 'Usuário não encontrado'
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword){
      return res.status(400).send({
        error: 'Senha inválida'
      });
    }

    password = undefined;
    user.password = undefined;

    return res.status(200).send({
      user,
      token: generateToken({id: user.id})
    });
  }catch(err) {
    return res.status(400).send({
      error: err
    })
  }
});

router.get('/profile/:id', async (req, res) => {
  console.log('Entrou')
  try {
    const { id } = req.params;
    
    const user = await User.findOne( 
      {
        where: { id: id} ,
        include: [
          {
            model: Event,
            include: [
              {
                model: User,
                attributes: ['nickname']
              }
            ],
            where: {userId: id}
          }
        ]
      }
    );
    if (!user) {
      return res.status(400).send({ error: 'Erro ao buscar usuário' });
    }
    return res.status(200).send({ user });
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Ocorreu um erro ao carregar perfil' });
  }
  
});


router.post('/update', async (req, res) => {
  try {
    const { id, nickname, about, email } = req.body;
    console.log(about)
    await User.update(
      {
        nickname: nickname,
        about: about,
        email: email
      },
      {where:{id: id}}
    )

    return res.status(200).send({message: "Usuário atualizado"});
  } catch (error) {
    console.log(error);
    return res.status(400).send({message: "Erro ao atualizar usuário"});
  }
});



router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
    
  try {
    const user = await User.findOne({ where: { email:email } });
    if(!user){
      return res.status(400).send({error: 'Este e-mail não está cadastrado no sistema'});
    }

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.update(
      {
        passwordResetToken: token,
        passwordResetExpires: now
      },
      {
        where: {
          id: user.id
        }
      }
    );

    mailer.sendMail({
      subject: 'Alteração de senha',
      to: email,
      from: 'pedroherculesdantas@gmail.com',
      template: 'auth/forgot-password',
      context: { 
        nickname: user.nickname,
        token: token
      }
    }, (err) => {
      if (err){
        console.log(err)
        return res.status(400).send({ error: 'Erro ao enviar e-mail' });
      }
      return res.send();
    });
    
  } catch (err) {
    console.log(err)
    return res.status(400).send({
      error: err
    });
  }
});

router.post('/reset-password', async (req, res) => {
  const { userId, token, password } = req.body;

  const user = await User.findOne({ where: {id: userId} });

  if (!user) {
    return res.status(400).send({error: 'Usuário não existe'});
  }

  if (token !== user.passwordResetToken){
    return res.status(400).send({ error: 'Token inválido' });
  }

  const now = new Date();

  if (now > user.passwordResetExpires){
    return res.status(400).send({ error: 'Token expirou'});
  }

  await user.update(
    {
      password: password,
    },
    {
      where: { id: user.id }
    }
  );

  res.send();
});

export default router;

