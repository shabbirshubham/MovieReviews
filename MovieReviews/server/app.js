var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/MovieReviewProject');

mongoose.connection.on('open',function () {
console.log('Movie Review Database Connected');
});

require('./services/user.service.server');

