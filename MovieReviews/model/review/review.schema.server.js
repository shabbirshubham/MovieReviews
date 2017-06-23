
var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    movieName:{type: String, required:true },
    movieId:{type:String,required:true},
    text:String,
    userId: {type:mongoose.Schema.ObjectId , ref:'UserModel',required:true},
    posted: {type:Date, default:Date.now}
});

module.exports=reviewSchema;
