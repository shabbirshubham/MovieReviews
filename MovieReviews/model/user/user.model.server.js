
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model('UserModel',userSchema);

//--------------------------------------------------------
    //--Function Declarations-----------//
userModel.findUserByCredentials=findUserByCredentials;
userModel.createUser=createUser;
userModel.deleteUser=deleteUser;
userModel.findUserByEmail=findUserByEmail;
userModel.findUserByUsername=findUserByUsername;
userModel.updateUser=updateUser;
userModel.findUserById=findUserById;
//----------------------------------------------------------
module.exports = userModel;
//--------------------------------------------------------
        //----Function Definitions-------//

function findUserByCredentials(username,password) {
    return userModel.findOne({username:username,password:{$exists:true}});
}

function createUser(user) {
   return userModel.create(user);
}

function deleteUser(userId) {
    return userModel.remove({_id:userId});
}

function findUserByEmail(email) {
    return userModel.findOne({email:email});
}

function findUserByUsername(username) {
    return userModel.findOne({username:username});

}

function updateUser(userId,user) {
    return userModel.update({_id:userId},{$set:user});
}

function findUserById(userId) {
    return userModel.findById(userId);
}