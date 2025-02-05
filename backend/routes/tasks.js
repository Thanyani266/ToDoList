// imports
const express = require('express')
const app = express()
const { getTasks, createTask, getTask, deleteTask, updateTask, getTasksByList } = require('../controllers/tasksController')
const { verifyJWT } = require('../controllers/usersController')

// Router constructor
router = express.Router()

// tasks routes
router.get('/tasks', getTasks)
router.get('/tasks/:category', getTasksByList)
router.post('/task', createTask)
router.get('/task/:id', getTask)
router.delete('/task/:id', deleteTask)
router.put('/task/:id', updateTask)

module.exports = router