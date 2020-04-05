import crypto from 'crypto';
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db-dev.sqlite',
  operatorsAliases: Sequelize.Op,
  logging: console.log
});

const User = sequelize.define('auths', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  pw: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'auths'
});

export const createUser = (data) => {
  return User.create(data);
};

export const findUser = (id) => {
  return User.findOne({
    where: {id}
  });
};

User.sync({force: true}).then(() => {
  const salt = "custom_salt";
  let hash = crypto.createHmac('sha256', salt);
  createUser({
    id: 'deok',
    pw: hash.update('deok')
            .digest("base64"),
    name: 'admin',
    email: 'testEmail',
    salt
  });
})