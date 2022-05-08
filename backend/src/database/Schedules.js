import { Sequelize } from 'sequelize';
import connection  from './database.js';
import User from './User.js';
import Event from './Event.js';

const Schedules = connection.define('schedules', {
  eventId: {
    type: Sequelize.INTEGER,
    allownull: false
  },

  userId: {
    type: Sequelize.INTEGER,
    allownull: false
  },

  title: {
    type: Sequelize.STRING,
    allownull: false
  },

  description: {
    type: Sequelize.STRING,
    allownull: false
  },

  beginDate: {
    type: Sequelize.STRING,
    allownull: false
  },

  endDate: {
    type: Sequelize.STRING,
    allownull: false
  }
});

Schedules.sync({force: false});

User.hasMany(Schedules);
Event.hasMany(Schedules);
Schedules.belongsTo(User);
Schedules.belongsTo(Event);

export default Schedules;
