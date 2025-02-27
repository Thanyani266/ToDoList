const axios = require('axios');
const { v4: uuid } = require('uuid');

const API_URL = 'https://json-server-data-5js7.onrender.com/tasks'; // Replace with your web server URL

// Deleting tasks with dates before today
const deleteOldTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        const tasks = response.data;
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

        const deletePromises = tasks
            .filter(task => new Date(task.date) < new Date(today))
            .map(task => axios.delete(`${API_URL}/${task.id}`));

        await Promise.all(deletePromises);
    } catch (err) {
        console.error('Error deleting old tasks:', err.message);
    }
};

// Getting tasks with dates from today onwards
const getTasks = async (req, res) => {
    try {
        await deleteOldTasks(); // Ensure old tasks are deleted before getting new ones
        const response = await axios.get(API_URL);
        const tasks = response.data;
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

        const tasksFromToday = tasks.filter(task => new Date(task.date) >= new Date(today));
        res.json(tasksFromToday);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Getting all tasks
const getTasksFromToday = async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Getting tasks by category(list)
const getTasksByList = async (req, res) => {
    const category = req.params.category;
    try {
        const response = await axios.get(`${API_URL}?category=${category}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Adding a new task
const createTask = async (req, res) => {
    const task = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    };

    const newTask = { ...task, id: uuid() };
    try {
        const response = await axios.post(API_URL, newTask);
        res.status(201).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Getting a single task
const getTask = async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/${req.params.id}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Deleting a task
const deleteTask = async (req, res) => {
    try {
        await axios.delete(`${API_URL}/${req.params.id}`);
        res.send("Task deleted successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Editing a task
const updateTask = async (req, res) => {
    const updatedTask = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    };

    try {
        const response = await axios.put(`${API_URL}/${req.params.id}`, updatedTask);
        res.send("Task updated successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Exporting functions
module.exports = { getTasks, createTask, getTask, deleteTask, updateTask, getTasksByList };
