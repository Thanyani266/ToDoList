// Required packages
const fsPromises = require('fs').promises
const path = require('path')
const { v4 : uuid } = require('uuid')

// data table for tasks
const data = {
    tasks: require('../public/tasks.json'),
    setTasks: function (data) { this.tasks = data}
}

// getting all tasks
const getTasks = (req, res) => {
    res.json(data.tasks)
}

// getting tasks by category(list)
const getTasksByList = async (req, res) => {
    const category = req.params.category;
    try {
        const tasks = await data.filter(task => task.category === category);
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Adding a new task
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
        path.join(__dirname, '..', 'public', 'tasks.json'),
        JSON.stringify(data.tasks)
    );
    console.log(data.tasks)
    res.status(201).json(data.tasks) // 201 ==> created new task
}

// getting a single task
const getTask = (req, res) => {
    const singleTask = data.tasks.filter(task => task.id === req.params.id)
    res.send(singleTask)
}

// deleting a task
const deleteTask = async (req, res) => {
    tasks = data.tasks.filter(task => task.id !== req.params.id)
    data.setTasks([...tasks])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'tasks.json'),
        JSON.stringify(data.tasks)
    );
    res.send("Task deleted successfully")
}

// editting a task
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

// exporting fns 
module.exports = { getTasks, createTask, getTask, deleteTask, updateTask, getTasksByList }