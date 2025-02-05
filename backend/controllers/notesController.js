// Required packages
const fsPromises = require('fs').promises
const path = require('path')
const { v4 : uuid } = require('uuid')

// Sticky notes data table
const data = {
    notes: require('../models/notes.json'),
    setNotes: function (data) { this.notes = data}
}

// getting all the sticky notes
const getNotes = (req, res) => {
    res.json(data.notes)
}

// adding a new note
const createNote = async (req, res) => {
    const note = {
        title: req.body.title,
        description: req.body.description,
        background: req.body.background,
        username: req.body.username
    }
    console.log(note.title)
    const newNote = {...note, id: uuid()};
    data.setNotes([...data.notes, newNote])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'notes.json'),
        JSON.stringify(data.notes)
    );
    console.log(data.notes)
    res.status(201).json(data.notes) // 201 ==> created new sticky note
}

// getting a single sticky note
const getNote = (req, res) => {
    const singleNote = data.notes.filter(note => note.id === req.params.id)
    res.send(singleNote)
}

// deleting a single sticky note
const deleteNote = async (req, res) => {
    notes = data.notes.filter(note => note.id !== req.params.id)
    data.setNotes([...notes])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'notes.json'),
        JSON.stringify(data.notes)
    );
    res.send("Task deleted successfully")
}

// editting a sticky note based on id
const updateNote = async (req, res) => {
    const note = data.notes.find(note => note.id === req.params.id)

    note.title = req.body.title;
    note.description = req.body.description;
    note.background = req.body.background;

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'notes.json'),
        JSON.stringify(data.notes)
    );

    res.send("Task updated successfully")
}

// exporting the functions
module.exports = { getNotes, createNote, getNote, deleteNote, updateNote }