// imports
const express = require('express')
const app = express()
const { getNotes, createNote, getNote, deleteNote, updateNote } = require('../controllers/notesController')

// Router constructor
router = express.Router()

// Sticky notes routes
router.get('/notes', getNotes)
router.post('/note', createNote)
router.get('/note/:id', getNote)
router.delete('/note/:id', deleteNote)
router.put('/note/:id', updateNote)

module.exports = router