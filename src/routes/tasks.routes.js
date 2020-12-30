const {
    Router
} = require('express')
const router = Router();

const {
    createTask,
    renderAllTasks,
    renderEditForm,
    renderMyTask,
    renderTaskForm,
    updateTask,
    deleteTask,
    updateStatus
} = require('../controllers/task.controller')

const {
    isAuthenticated
} = require('../helpers/auth');



// Assign a task

router.get('/tasks/add-task',renderTaskForm)

router.post('/tasks/add-task',createTask)


//Render Tasks

router.get('/tasks/my-tasks',renderMyTask)

router.get('/tasks/all-tasks',renderAllTasks)


//Update tasks

router.get('/tasks/edit-task/:id',renderEditForm)

router.put('/tasks/edit-task/:id',updateTask)

//update status
router.put('/tasks/edit-task-status/:id/:status',updateStatus)


//delete tasks
router.delete('/tasks/delete/:id',deleteTask)


module.exports = router