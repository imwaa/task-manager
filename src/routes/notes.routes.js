const {
    Router
} = require('express')
const router = Router();

const {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
} = require('../controllers/notes.controller')

const{isAuthenticated} = require('../helpers/auth')

//Create New NOTE
router.get('/notes/add',isAuthenticated, renderNoteForm)

router.post('/notes/new-note',isAuthenticated, createNewNote)


//Get All notes
router.get('/notes',isAuthenticated, renderNotes)

// Edit/Update Notes

router.get('/notes/edit/:id',isAuthenticated, renderEditForm)

router.put('/notes/edit-note/:id',isAuthenticated, updateNote)

// Delete notes

router.delete('/notes/delete/:id',isAuthenticated, deleteNote)

module.exports = router