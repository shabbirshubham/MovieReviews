var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: String,
    firstName: String,
    lastName: String,
    facebook: {id: String, token: String},
    google: {id: String, token: String},
    email: String,
    imgUrl: String,
    phone: String,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'RateMyMovieMovie'}],
    movieReviews: [{type: mongoose.Schema.ObjectId, ref:'MovieReviewModel'}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    role: {type: String, enum: ['user','fan','critic', 'admin'], default: 'user'},
    dateCreated: {type: Date, default: Date.now()}
},{collection:'user'});

module.exports = userSchema;