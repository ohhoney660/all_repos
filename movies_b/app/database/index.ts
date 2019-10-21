class DatabaseSdk {
    constructor() { }
    create(doc) {
        return doc.save();
    }
    findAll(doc) {
        return doc.find().then(data => {
            return data;
        }).catch(err => {
            return err;
        });
    }
    findById(doc, id) {
        return doc.findById(id).then(data => {
            return data;
        }).catch(err => {
            return err;
        });
    }
    update(doc, data, id) {
        return doc.findByIdAndUpdate(id, { $addToSet: data }, { new: true }).then(data => {
            return data;
        }).catch(err => {
            return err;
        });
    }
    delete(doc, id) {
        return doc.findByIdAndRemove(id).then(data => {
            return data;
        }).catch(err => {
            return err;
        })
    }
}
module.exports = DatabaseSdk;
