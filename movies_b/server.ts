import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const dbConfig = require('./app/database/db.config');
const app = express();
const routes = require('./routes.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use('/', routes);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
