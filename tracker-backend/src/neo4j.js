var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic('neo4j', '12345'));
var session = driver.session();
var uuid = require('uuid');
router.post('/create/:userId/:friendId', (req,res,err) => {

    session
           .run(`CREATE (me:USER {userName:'${req.params.userId}'}),(myFriend:USER {userName: '${req.params.friendId}'}) 
                 CREATE (me)-[r:friend]->(myFriend) RETURN type(r),me.userName, myFriend.userName`)
           .then((result) => {
            res.send(result.records[0]._fields);
           })
           .catch((err) => {console.log('errr', err);});
});

router.delete('/delete/:userId/:friendId', (req,res,err) => {

    session
           .run(`MATCH (me:USER {userName:'${req.params.userId}'}),(myFriend:USER {userName: '${req.params.friendId}'}) 
                DETACH DELETE myFriend RETURN me`)
           .then((result) => {

            res.send(result.records);
           })
           .catch((err) => {console.log('errr', err);});
});

router.delete('/deleteUser/:userId/', (req,res,err) => {

    session
           .run(`MATCH (me:USER {userName:'${req.params.userId}'}) DETACH DELETE me RETURN me`)
           .then((result) => {

            res.send(result.records);
           })
           .catch((err) => {console.log('errr', err);});
});

router.get('/userFriends/:userId/', (req,res,err) => {
    session
           .run(`MATCH (me:USER {userName:'${req.params.userId}'})-[r:friend]->(myFriend) RETURN me,myFriend`)
           .then((result) => {
            let userFriends = {
                userId : result.records[0]._fields[0].properties.userName,
                friends: []
            }
            result.records.forEach(post => {
                console.log(post._fields[1].properties);
                userFriends.friends.push({id:post._fields[1].properties.userName})
            });
            res.send(userFriends);
           })
           .catch((err) => {console.log('errr', err);});
});
// MATCH (me:user {firstName:'swetha'})-[:friend]->(myFriend:user)-[:friend]->(other) WHERE myFriend.firstName='aish' RETURN me,myFriend,other
router.get('/userFriendFriends/:userId/', (req,res,err) => {
    session
           .run(`MATCH (me:USER {userName:'${req.params.userId}'})-[r:friend]->(myFriend)-[:friend]->(friendoffriend) RETURN me,myFriend,friendoffriend`)
           .then((result) => {
               
            // let userFriends = {
            //     userId : result.records[0]._fields[0].properties.userName,
            //     friends: []
            // }
            // result.records.forEach(post => {
            //     console.log(post._fields[1].properties);
            //     userFriends.friends.push({id:post._fields[1].properties.userName})
            // });
            res.send({records: result.records});
           })
           .catch((err) => {console.log('errr', err);});
});

router.get('/userPosts/:userId', (req,res,err) => {

    session
           .run(`MATCH (me:USER {userName:'${req.params.userId}'})-[r:createdBy]->(myPost) RETURN me,myPost`)
           .then((result) => {
            let userPosts = {
                userId : result.records[0]._fields[0].properties.userName,
                posts: []
            }
            result.records.forEach(post => {
                console.log(post._fields[1].properties);
                userPosts.posts.push({id:post._fields[1].properties.postId})
            });

            res.send(userPosts);
           })
           .catch((err) => {console.log('errr', err);});
});

router.post('/createpost/:userId/:postId', (req,res,err) => {

    session
    .run(`CREATE (me:USER {userName:'${req.params.userId}'}),(myPost:POSTS {postId: '${req.params.postId}'})
          CREATE (me)-[r:createdBy]->(myPost) RETURN type(r),me.userName, myPost.postId`)
           .then((result) => {
               console.log('resultttt', result);
            res.send(result.records[0]._fields);
           })
           .catch((err) => {console.log('errr', err);});
});


module.exports = router;