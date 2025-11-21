const express = require('express');
const { getTasks, createTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', protect, getTasks);
router.post('/', protect, createTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;