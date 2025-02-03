const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { handleNewUser, handleLogin, userInfo, handleRefreshToken, handleLogout, verifyUser } = require('../controllers/usersController')

const app = express()

router = express.Router()

router.get('/refresh', handleRefreshToken)
router.post('/register', handleNewUser)
router.post('/login', handleLogin)
router.get('/logout', handleLogout)
//app.use(verifyUser())
router.get('/user', userInfo)

module.exports = router