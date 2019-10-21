import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdBy: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);