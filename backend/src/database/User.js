import { Sequelize } from 'sequelize';
import connection  from './database.js';
import bcrypt  from 'bcryptjs';


const User = connection.define('users', {
  nickname: {
    type: Sequelize.STRING,
    allownull: false,
    unique: true
  },

  email: {
    type: Sequelize.STRING,
    allownull: false
  },

  password: {
    type: Sequelize.STRING,
    allownull: false
  },

  passwordResetToken: {
    type: Sequelize.STRING,
    select: false
  },

  passwordResetExpires: {
    type: Sequelize.DATE,
    select: false
  }
});

User.beforeCreate( async (user) => {
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
});

User.beforeUpdate( async (user) => {
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
});



User.sync( {force: false} );
export default User;
