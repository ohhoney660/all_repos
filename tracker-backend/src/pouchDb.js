const express = require('express');

const _ = require('lodash');
PouchDb = require('pouchdb');
db = new PouchDb('use');

const router = express.Router();
router.get('/', (req, res, err) => {
	db.info((err, info) => {
		if (err) throw err;
		res.send(info);
	});
});

router.post('/create', (req, res, err) => {
	let doc = {
		id: _.get(req.body, 'id'),
		name: _.get(req.body, 'name'),
		age: _.get(req.body, 'age'),
		designation: _.get(req.body, 'designation'),
	};
	try {
		db.post(doc, function(err, response) {
			if (err) {
				res.send(err);
			} else {
				res.send(response);
			}
		});
	} catch (err) {
		res.send(err);
	}
});

router.get('/get/:id', (req, res, err) => {
	try {
		db.get(req.params.id, { attachments: true }, function(err, response) {
			if (err) {
				res.send(err);
			} else {
				res.send(response);
			}
		});
	} catch (err) {
		res.send(err);
	}
});

router.delete('/deleteDatabase', (req, res, err) => {
	try {
		db.destroy(function(err, response) {
			if (err) {
				res.send(err);
			} else {
				res.send(response);
			}
		});
	} catch (err) {
		res.send(err);
	}
});

router.delete('/delete/:id', (req, res, err) => {
	db
		.get(req.params.id)
		.then(doc => {
			db
				.remove(doc._id, doc._rev)
				.then(info => {
					info.message = 'Document deleted successfully';
					res.send(info);
				})
				.catch(err => {
					res.send(err);
				});
		})
		.catch(err => {
			res.send(err);
		});
});

router.post('/create_bulk', (req, res, err) => {
	db.bulkDocs(req.body.bulk)
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			res.send(err);
		});
});

router.get('/all', (req, res, err) => {
	db
		.allDocs({
			include_docs: true,
			attachments: true,
		})
		.then(function(result) {
			res.send(result);
		})
		.catch(function(err) {
			res.send(result);
		});
});
router.post('/create_file', (req, res, err) => {
	console.log(req);
	let doc = {
		_id: _.get(req.body, 'id'),
		name: _.get(req.body, 'name'),
		path: _.get(req.body, 'path'),
		size: _.get(req.body, 'size'),
		type: _.get(req.body, 'type'),
		lastModifiedDate: _.get(req.body, 'lastModifiedDate'),
	};
	console.log(doc);
	try {
		db.post(doc, function(err, response) {
			if (err) {
				res.send(err);
			} else {
				res.send(response);
			}
		});
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;
