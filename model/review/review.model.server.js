
var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('ReviewModel',reviewSchema);
var userModel = require('../user/user.model.server');
//-----------------------------------------------------------
    //Function Declarations
reviewModel.createReview = createReview;
reviewModel.deleteReview = deleteReview;
reviewModel.editReview = editReview;
reviewModel.getAllReviews = getAllReviews;
reviewModel.getUserIdbyReviewId = getUserIdbyReviewId;
reviewModel.editReview = editReview;

module.exports=reviewModel;
//------------------------------------------------------------
    //Function Definitions

function createReview(userId,review) {
    return reviewModel
        .create(review)
        .then(function (review) {
           return userModel.addReview(userId,review._id);
        });
}

function deleteReview(userId,reviewId) {
    return reviewModel
        .remove({_id:reviewId})
        .then(function (status) {
            return userModel.deleteReview(userId,reviewId);
        });
}

function editReview(reviewId,review) {
    return reviewModel.update({_id:reviewId},{$set:review});
}

function getAllReviews() {
    return reviewModel.find();
}

function getUserIdbyReviewId(reviewId) {
    return reviewId.findById(reviewId)
        .then(function (review) {
           return review.userId;
        });
}
// ---------------------------------------------------------------