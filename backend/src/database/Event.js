import { Sequelize } from 'sequelize';
import connection from './database.js';

const Event = connection.define('events', {
  title: {
    type: Sequelize.STRING,
    allownull: false
  },

  description: {
    type: Sequelize.STRING,
    allownull: false
  },
  about: {
    type: Sequelize.STRING,
    allownull: false
  },
  dateBegin: {
    type: Sequelize.STRING,
    allownull: false
  },
  dateEnd: {
    type: Sequelize.STRING,
    allownull: false
  },
  time: {
    type: Sequelize.TIME,
    defaultValue: '00:00:00',
    allownull: false
  },
  type: {
    type: Sequelize.STRING,
    allownull: false
  },
  local: {
    type: Sequelize.STRING,
    allownull: false
  },
  image: {
    type: Sequelize.BLOB,
    allownull: false
  }
});

Event.sync({ force: false });

export default Event;