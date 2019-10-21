const User = require('../models/user.model');
import * as _ from 'lodash';
const Database = require('../database/index');
let db = new Database();
class UserController {
	constructor() {}
	// Create and Save a new User
	async create(req, res) {
		if (!req.body.request.userName || !req.body.request.email) {
			let nullData = _.isEmpty(req.body.request.userName)
				? 'userName'
				: _.isEmpty(req.body.request.email) ? 'email' : 'userName and email';
			return res.status(400).send({
				message: `User  ${nullData} can not be empty`,
			});
		}
		const user = new User({
			userName: req.body.request.userName,
			email: req.body.request.email,
			name: req.body.request.name || req.body.request.userName,
			dob: req.body.request.dob || '',
		});
        let data =  await db.create(user).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the User.',
            });
            });
           res.status(200).send({ data: data });
	}

	// Retrieve and return all users from the database.
	async findAll(req, res) {
		let data = await db.findAll(User).catch(error => {
			res.status(500).send({ message: err.message || 'Some error occurred while retrieving users.' });
		});
		res.status(200).send({ data: data });
	}

	// Find a single user with a userId
	async findOne(req, res) {
		let data = await db.findById(User, req.params.userId).catch(err => {
			res.status(500).send({ message: err.message || 'Error retrieving user with id ' + req.params.userId });
		});

		if (!data) {
			return res.status(404).send({
				message: 'User not found with id' + req.params.userId,
			});
		}
		res.status(200).send({ data: data });

	}

	// Update a user identified by the userId in the request
	async update(req, res) {
		let updateUser = this.getUserData(req.body.request);
		let data = await db.update(User, updateUser, req.params.userId).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId,
                });
            }
            return res.status(500).send({
                message: 'Error updating user with id ' + req.params.userId,
            });
            });
		    if (!data) {
					return res.status(404).send({
						message: 'User not found with id ' + req.params.userId,
					});
				}
				res.status(200).send({ data: data });
	}

	getUserData(req) {
		let userData = {};
		for (let key in req) {
			userData[key] = req[key];
		}
		return userData;
	}

	// Delete a user with the specified userId in the request
	async delete(req, res) {
		let data = await db.delete(User, req.params.userId).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId,
                });
            }
                return res.status(500).send({
                message: 'Could not delete user with id' + req.params.userId,
                });
        });

				if (!data) {
					return res.status(404).send({
						message: 'User not found with id' + req.params.userId,
					});
				}
				res.status(200).send({ message: 'User deleted successfully!' });
    }
}
module.exports = UserController;
