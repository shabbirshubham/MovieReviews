var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    movieId: {type: String, unique: true},
    title: String,
    imageUrl: String
},{collection:'movie'});

module.exports = movieSchema;