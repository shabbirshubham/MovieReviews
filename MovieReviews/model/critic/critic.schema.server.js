var mongoose = require('mongoose');

var criticSchema = mongoose.Schema({
    title: String,
    description: String,
    timestamp: {type: Date, default: Date.now()},
    movieId: String,
    _movie: {type: mongoose.Schema.Types.ObjectId, ref: 'MCMovie'},
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'MCUser'},
    rating: String
},{collection:'critic'});

module.exports = criticSchema;