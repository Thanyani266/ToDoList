const express = require('express')
const app = express()
const { getLists, createList, getList, deleteList, updateList } = require('../controllers/listsController')

router = express.Router()

router.get('/lists', getLists)
router.post('/list', createList)
router.get('/list/:id', getList)
router.delete('/list/:id', deleteList)
router.put('/list/:id', updateList)

module.exports = router