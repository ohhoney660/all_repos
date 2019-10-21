var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic('neo4j', '12345'));
var session = driver.session();
router.get('/create', (req,res,err) => {
    res.send('Hello')
});
module.exports = router;
