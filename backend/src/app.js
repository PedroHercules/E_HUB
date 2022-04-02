import express from 'express';
import cors from 'cors';

import userController from './controllers/userController.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

app.use('/user', userController);

export default app;
