const express = require('express');
const bodyParser = require('body-parser');
const pouchDb = require('./pouchDb');
const app = express();
const neoUser = require('./neo4j');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/pouchdb', pouchDb);
app.use('/neo4j', neoUser);

const port = 9011;
app.listen(port, (res, err) =>{
  if(err) return err;
  console.log('app listens at port', port);
});