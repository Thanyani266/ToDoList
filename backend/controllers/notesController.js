const axios = require('axios');
const { v4: uuid } = require('uuid');

const API_URL = 'https://json-server-data-5js7.onrender.com/notes'; // Replace with your web server URL

// Getting all the sticky notes
const getNotes = async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Adding a new note
const createNote = async (req, res) => {
    const note = {
        title: req.body.title,
        description: req.body.description,
        background: req.body.background
    };

    const newNote = { ...note, id: uuid() };
    try {
        const response = await axios.post(API_URL, newNote);
        res.status(201).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Getting a single sticky note
const getNote = async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/${req.params.id}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Deleting a single sticky note
const deleteNote = async (req, res) => {
    try {
        await axios.delete(`${API_URL}/${req.params.id}`);
        res.send("Note deleted successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Editing a sticky note based on id
const updateNote = async (req, res) => {
    const updatedNote = {
        title: req.body.title,
        description: req.body.description,
        background: req.body.background
    };

    try {
        const response = await axios.put(`${API_URL}/${req.params.id}`, updatedNote);
        res.send("Note updated successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Exporting the functions
module.exports = { getNotes, createNote, getNote, deleteNote, updateNote };
