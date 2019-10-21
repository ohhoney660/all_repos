const mongo =require ('mongoose');
const users = mongo.Schema({
    name:{
        type: String,
         require: true
     },
     username:{
         type: String,
         require: true
     },
     email: {
         type:String,
         require: true
     },
     password: {
         type: String,
         require: true
     }
});
const user = module.exports = mongo.model('users', users); 