import { Sequelize } from 'sequelize';
import connection from './database.js';
import User from './User.js';

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
    type: Sequelize.TEXT,
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
  type: {
    type: Sequelize.STRING,
    allownull: false
  },
  local: {
    type: Sequelize.STRING,
    allownull: false
  },
  link: {
    type: Sequelize.STRING,
    allownull: false
  },
  image: {
    type: Sequelize.STRING,
    allownull: false
  }
});

User.hasMany(Event);
Event.belongsTo(User);

Event.sync({ force: false });

export default Event;