import jwt from 'jsonwebtoken';


import 'dotenv/config';


export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).send({
      error: 'O token não foi informado'
    });
  }

  const parts = authHeader.split(' ');
  if(!parts.length === 2) {
    return res.status(401).send({
      error: 'Token error'
    });
  }

  const [scheme, token] = parts;
  console.log(token);

  if(!/^Bearer$/i.test(scheme)){
    return res.status(401).send({
      error: 'Erro no formato do token'
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token inválido' });
    
    req.userId = decoded.id;
    return next();
  });
}