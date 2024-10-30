const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const db = require('../models'); // Assuming the models are exported from this path

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authController.register(email, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authController.login(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;

// Inside models/index.js or wherever the database connection is configured
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'mysql://user:pass@db/dbname', {
  dialect: 'mysql',
  host: 'db'
});

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'users'
});

module.exports = {
  sequelize,
  User
};

// Updated seed_users.js
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      email: '[email1]',
      password: '[hashedPassword1]'
    },
    {
      email: '[email2]',
      password: '[hashedPassword2]'
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};