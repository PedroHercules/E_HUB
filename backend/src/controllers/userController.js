import { Router } from 'express';
import User from '../database/User.js';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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

export default router;

