// var express = require ('express');
// var mongo = require('mongoose');
// var user = require('./model/userModel');
// var uuid = require('uuid');
// var userRoute = express.Router();

// mongo.connect("mongodb://localhost:27017/users");
// mongo.connection.on('connected', () => {
//     console.log('connected');
// });

// userRoute.get('/all', (req,res,next) => {
//     user.find((err, usersList) => {
//         res.json(usersList);
//     });
// });
// userRoute.post('/create', (req,res,next) => {
//    const UNINUM = Math.floor(Math.random() * Math.floor(9123));
//    console.log('usernameee', req.body.request.name + UNINUM);
//     let newuser = new user({
//         username: req.body.request.username,
//         name: req.body.request.name,
//         email:req.body.request.email,
//         password:req.body.request.password
//     });
//     newuser.save((err) => {
//         console.log(err);
//         if(err) {
//             res.json(err);
//         } else {
//             res.json({msg: 'User Created successfully'});
//         }
//     });
//     });

//     userRoute.patch('/update/:id', (req,res,next) => {
//         console.log(req.body);
//     user.findOneAndUpdate(
//         { _id: req.params.id},
//         {
//             $set:{
//                 username: req.body.username,
//                 name: req.body.name,
//                 email:req.body.email,
//                 password:req.body.password,
    
//             }
//         },
//         (err, result) => {
//             if(err) {
//                 res.json(result);
//             } else {
//                 res.json({msg: 'user updated successfully'});
//             }
//         });
//     });
    
//     userRoute.delete('/delete/:id', (req,res,next) => {
//         user.remove({
//             _id: req.params.id
//         }, (err, result) =>{
//             if(err) {
//                 res.json(result);
//             } else {
//                 res.json({msg: 'user deleted successfully'});
//             }
//         });
//     });
    
//     userRoute.get('/get/:id', (req,res,next)=> {
//         console.log(req.params.id);
//         user.findById(req.params.id )
//             .then(doc => {
//                 if(!doc) {return res.status(404).end();}
//                 return res.status(200).json(doc);
//             })
//             .catch(err => next(err));
        
//     });

//     userRoute.get('/username/{username}', (req,res,next)=> {
//         console.log(req.params.username)
//         user.find({
//             username: req.params.username
//         }, (err,result) => {
//             if(err) {
//                 res.json(result);
//             } else {
//                 res.json({msg: 'user deleted successfully'});
//             }
//         });
// });
// module.exports = user;