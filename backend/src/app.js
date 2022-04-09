import express from 'express';
import cors from 'cors';

import userController from './controllers/userController.js';
import eventController from './controllers/eventController.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

app.use('/user', userController);
app.use('/event', eventController);
export default app;
