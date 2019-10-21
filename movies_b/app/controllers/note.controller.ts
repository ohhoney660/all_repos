const Note = require('../models/note.model.js');
const _ = require('lodash');
// Create and Save a new Note
exports.create = (req, res) => {

	if (!req.body.request.content || !req.body.request.createdBy) {
        let nullData = _.isEmpty(req.body.request.content) ? 'content' : _.isEmpty(req.body.request.createdBy) ? 'createdBy' : 'userName and createdBy';

		return res.status(400).send({
			message: `Note ${nullData} can not be empty`,
		});
	}
	const note = new Note({
		title: req.body.request.title || 'Untitled Note',
        content: req.body.request.content,
        createdBy: req.body.request.createdBy
    });
    note.save().then(data => {
         res.status(200).send({data: data});
    }).catch(err => {
         res.status(500).send({
            message: err.message || 'Some error occurred while creating the Note.'
        })
    })
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find().then(data => {
         res.status(200).send({data: data});

    }).catch(err => {
         res.status(500).send({message: err.message || 'Some error occurred while retrieving notes.'});
    })
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
Note.findById(req.params.noteId).then(data => {
    if (!data) {
        return res.status(404).send({
            message: 'Note not found with id' + req.params.noteId
		});
    }
    res.status(200).send({data: data})
}).catch(err => {
    res.status(500).send({message: err.message || 'Error retrieving note with id ' + req.params.noteId});
})
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    if (!req.body.request.content) {
        return res.status(400).send({
            message: 'Note content can not be empty'
        });
    }
    let noteData = this.getNoteData(req.body.request);
    Note.findByIdAndUpdate(req.params.noteId, noteData , $push, {new: true}).then(data => {
        console.log('dataaaa', data);
        if (!data) {
            return res.status(404).send({
                message: 'Note not found with id ' + req.params.noteId
            });  
        }
        res.send({data: data})
    }).catch(err => {

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'Note not found with id ' + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: 'Error updating note with id ' + req.params.noteId
        });
    })
};
exports.updateUserNotes = (req,res) => {

}

exports.getNoteData = (req) => {
    let noteData = {};
    if(req.content) {
        noteData.content = req.content;
    }
    if (req.createdBy) {
        noteData.createdBy = req.createdBy;
    }
    if (req.title) {
        noteData.title = req.title;
    }
    return noteData;
}
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId).then(data => {
        if (!data) {
            return res.status(404).send({
                message: 'Note not found with id' + req.params.noteId
            }); 
        }
        res.send({message: 'Note deleted successfully!'});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: 'Note not found with id ' + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: 'Could not delete note with id' + req.params.noteId
        });
    })
};
