export class Database {
	constructor() {

	}

	getdatabase() {
		db.info((err, info) => {
			if (!err) {
				console.log(info);
			}
		});
	}

	deleteDatabase() {
		db.destroy(function(err, response) {
			if (err) {
				return console.log(err);
			} else {
				console.log('Database Deleted');
			}
		});
	}

	createDocument() {
		let doc = {
			_id: '002',
			name: 'Karthi',
			age: 23,
			designation: 'Designer',
		};
		db.put(doc, function(err, response) {
			if (err) {
				return console.log(err);
			} else {
				console.log('Document created Successfully', response);
			}
		});
	}
	getDocument() {
		db.get('002', (err, info) => {
			if (!err) {
				console.log('db value', info);
			} else {
				console.log('err field', err);
			}
		});
	}
}
