const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'db',
    dialect: 'mysql'
});

module.exports = sequelize;