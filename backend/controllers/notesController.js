const fsPromises = require('fs').promises
const path = require('path')
const { v4 : uuid } = require('uuid')

const data = {
    notes: require('../models/notes.json'),
    setNotes: function (data) { this.notes = data}
}

const getNotes = (req, res) => {
    res.json(data.notes)
}

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
    res.status(201).json(data.notes) // 201 ==> created new record
    //const post = req.body
    //posts.push()
    //res.send("Post added successfully")
}

const getNote = (req, res) => {
    const singleNote = data.notes.filter(note => note.id === req.params.id)
    res.send(singleNote)
}

const deleteNote = async (req, res) => {
    notes = data.notes.filter(note => note.id !== req.params.id)
    data.setNotes([...notes])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'notes.json'),
        JSON.stringify(data.notes)
    );
    res.send("Task deleted successfully")
}

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

module.exports = { getNotes, createNote, getNote, deleteNote, updateNote }