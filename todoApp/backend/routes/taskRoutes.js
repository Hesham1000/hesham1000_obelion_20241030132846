const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const Task = require('../models/Task'); // Ensure model file is imported

router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;

// models/Task.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure sequelize is correctly configured

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    dueDate: {
        type: DataTypes.DATE
    },
    priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        defaultValue: 'Low'
    }
}, {
    tableName: 'tasks'
});

module.exports = Task;

// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'db',
    dialect: 'mysql'
});

module.exports = sequelize;