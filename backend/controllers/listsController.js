// Required packages
const fsPromises = require('fs').promises
const path = require('path')
const { v4 : uuid } = require('uuid')

// category(list) table
const data = {
    lists: require('../models/lists.json'),
    setLists: function (data) { this.lists = data}
}

// getting all categories(lists)
const getLists = (req, res) => {
    res.json(data.lists)
}

// adding a new category(list)
const createList = async (req, res) => {
    const list = {
        option: req.body.option
    }
    console.log(list.title)
    const newList = {...list, id: uuid()};
    data.setLists([...data.lists, newList])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'lists.json'),
        JSON.stringify(data.lists)
    );
    console.log(data.lists)
    res.status(201).json(data.lists) // 201 ==> created new list
}

// getting a single category(list)
const getList = (req, res) => {
    const singleList = data.lists.filter(list => list.id === req.params.id)
    res.send(singleList)
}

// deleting a category(list)
const deleteList = async (req, res) => {
    const lists = data.lists.filter(list => list.id !== req.params.id)
    data.setLists([...lists])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'lists.json'),
        JSON.stringify(data.lists)
    );
    res.send("List deleted successfully")
}

// editting a category(list)
const updateList = async (req, res) => {
    const list = data.lists.find(list => list.id === req.params.id)

    list.option = req.body.option;

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'lists.json'),
        JSON.stringify(data.lists)
    );

    res.send("List updated successfully")
}

module.exports = { getLists, createList, getList, deleteList, updateList }