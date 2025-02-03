const fsPromises = require('fs').promises
const path = require('path')
const { v4 : uuid } = require('uuid')

const data = {
    tasks: require('../models/tasks.json'),
    setTasks: function (data) { this.tasks = data}
}

const getTasks = (req, res) => {
    res.json(data.tasks)
}

const getTasksByList = async (req, res) => {
    const category = req.params.category;
    try {
        const tasks = await data.filter(task => task.category === category);
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createTask = async (req, res) => {
    const task = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
        username: req.body.username
    }
    console.log(task.date)
    const newTask = {...task, id: uuid()};
    data.setTasks([...data.tasks, newTask])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'tasks.json'),
        JSON.stringify(data.tasks)
    );
    console.log(data.tasks)
    res.status(201).json(data.tasks) // 201 ==> created new record
    //const post = req.body
    //posts.push()
    //res.send("Post added successfully")
}

const getTask = (req, res) => {
    const singleTask = data.tasks.filter(task => task.id === req.params.id)
    res.send(singleTask)
}

const deleteTask = async (req, res) => {
    tasks = data.tasks.filter(task => task.id !== req.params.id)
    data.setTasks([...tasks])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'tasks.json'),
        JSON.stringify(data.tasks)
    );
    res.send("Task deleted successfully")
}

const updateTask = async (req, res) => {
    const task = data.tasks.find(task => task.id === req.params.id)

    task.title = req.body.title;
    task.description = req.body.description;
    task.category = req.body.category;
    task.date = req.body.date;

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'tasks.json'),
        JSON.stringify(data.tasks)
    );

    res.send("Task updated successfully")
}

module.exports = { getTasks, createTask, getTask, deleteTask, updateTask, getTasksByList }