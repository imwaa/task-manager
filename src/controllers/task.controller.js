const tasksCtrl = {}


const Task = require("../models/Task")
const User = require('../models/User')


tasksCtrl.createTask = async (req, res) => {
    const {
        title,
        description,
        employee,
        client,
        taskDate,
        status
    } = req.body

    const newTask = new Task({
        title,
        description,
        employee,
        client,
        taskDate,
        status,
    })

    await newTask.save()
    req.flash('succes_msg', `Task asigned to ${employee} succesfully`)
    res.redirect('/tasks/all-tasks')

    console.log(req.body)
    res.send('task created')
}

tasksCtrl.renderTaskForm = async (req, res) => {
    //Getting Clients from database
    const Clients = await User.find({
        role: "client"
    }).lean()
    //Getting Employees from database
    const Employee = await User.find({
        role: "employee"
    }).lean()

    res.render('tasks/add-task', {
        Clients,
        Employee
    })
}

tasksCtrl.renderMyTask = async (req, res) => {
    const myTask = await Task.find({
        employee: req.user.name
    })
    res.render('tasks/my-task', {
        myTask
    })
}

tasksCtrl.renderAllTasks = async (req, res) => {
    const Tasks = await Task.find().lean()
    res.render('tasks/all-tasks', {
        Tasks
    })
}


tasksCtrl.renderEditForm = (req, res) => {
    res.render('tasks/edit-task')
}

tasksCtrl.updateTask = (req, res) => {

}

tasksCtrl.updateStatus = async (req, res) => {
    const task = await Task.findById(req.params.id).lean()
    task.status = req.params.status

    const {
        title,
        description,
        employee,
        client,
        taskDate,
        status
    } = task

    await Task.findByIdAndUpdate(req.params.id, {
        title,
        description,
        employee,
        client,
        taskDate,
        status
    })
    req.flash('succes_msg','Task status updated')
    res.redirect('/tasks/my-tasks')


}

tasksCtrl.deleteTask = (req, res) => {


}

module.exports = tasksCtrl