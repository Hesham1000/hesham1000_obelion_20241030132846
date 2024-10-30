const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const Task = require('../models/Task'); // Ensure model file is imported

router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;



// config/database.js
