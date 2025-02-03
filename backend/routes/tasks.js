const express = require('express')
const app = express()
const { getTasks, createTask, getTask, deleteTask, updateTask, getTasksByList } = require('../controllers/tasksController')
const { verifyJWT } = require('../controllers/usersController')

router = express.Router()

router.get('/tasks', getTasks)
router.get('/tasks/:category', getTasksByList)
router.post('/task', createTask)
router.get('/task/:id', getTask)
router.delete('/task/:id', deleteTask)
router.put('/task/:id', updateTask)
//router.get('/post/:id', getRelatedPost)

module.exports = router