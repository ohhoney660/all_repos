import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema( {
		userName: String,
		email: String,
		name: String,
		dob: Number,
		createdNotes: Array,
		favNotes: Array,
		deletedNotes: Array,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', UserSchema);
