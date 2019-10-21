const express = require('express');
var router = express.Router();
const notes = require('./app/controllers/note.controller.js');
const Users = require('./app/controllers/user.controller.js');
const user = new Users();
// Create a new Note
router.post('/notes', notes.create);

// Retrieve all Notes
router.get('/notes', notes.findAll);

// Retrieve a single Note with noteId
router.get('/notes/:noteId', notes.findOne);

// Update a Note with noteId
router.put('/notes/:noteId', notes.update);

// Delete a Note with noteId
router.delete('/notes/:noteId', notes.delete);

// Create a new User
router.post('/users', (req, res) => {
    user.create(req, res);
});

// Retrieve all User
router.get('/users', (req, res) => {
    user.findAll(req, res);
});

// Retrieve a single User with userId
router.get('/users/:userId' , (req, res) =>{
    user.findOne(req, res)
});

// Update a User with userId
router.put('/users/:userId', (req, res) => {
    user.update(req, res)
});


// Delete a User with userId
router.delete('/users/:userId', (req, res) => {
    user.delete(req, res)
});


module.exports = router;
