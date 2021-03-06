
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
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.addReview = addReview;
userModel.deleteReview=deleteReview;
userModel.uploadProfileImage=uploadProfileImage;
userModel.addFollower=addFollower;
userModel.addFollowing=addFollowing;
userModel.getFollowers = getFollowers;
userModel.getFollowings=getFollowings;
userModel.removeFollowing=removeFollowing;

userModel.addMovie = addMovie;
userModel.getMoviesFromWatchList = getMoviesFromWatchList;
userModel.deleteMoviesFromWatchList = deleteMoviesFromWatchList;
userModel.likeMovie = likeMovie;
userModel.unlikeMovie  = unlikeMovie;
userModel.getLikedMovies = getLikedMovies;
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

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id':googleId});
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function addReview(userId,reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.reviews.push(reviewId);
            return user.save();
        })
}

function deleteReview(userId,reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.reviews.indexOf(reviewId);
            user.reviews.splice(index,1);
            return user.save();
        })
}

function uploadProfileImage(userId,url) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.url=url;
            return user.save();
        })
}

function addFollower(followeeId,followerId) {
    return userModel
        .findUserById(followeeId)
        .then(function (user) {
            user.followers.push(followerId);
            return user.save();
        })

}
function addFollowing(followeeId,followerId) {

    return userModel
        .findUserById(followerId)
        .then(function (user) {
            user.following.push(followeeId);
            return user.save();
        })

}

function getFollowers(userId) {
    return userModel
        .findById(userId)
        .populate('follower','username watchlist')
        .exec();

}

function getFollowings(userId) {
    return userModel
        .findById(userId)
        .populate('following','username watchlist')
        .exec();

}

function removeFollower(followeeId,followerId) {
    return userModel
        .findUserById(followeeId)
        .then(function (user) {
            user.followers.push(followerId);
            return user.save();
        })

}
function removeFollowing(followeeId,followerId) {

    return userModel
        .findUserById(followerId)
        .then(function (user) {
            var i = user.following.indexOf(followeeId);
            user.following.splice(i,1);
            return user.save();
        })
}
function addMovie(userId, movie) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.watchList.push(movie);
            return user.save();
        });
}

function getMoviesFromWatchList(userId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            return user.watchList;
        })
}

function deleteMoviesFromWatchList(movieId,userId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            for(m in user.watchList){
                var movie = user.watchList[m];
                // console.log(movie.id+" : "+movieId);
                if(parseInt(movie.id) === parseInt(movieId)){
                    user.watchList.splice(m,1);
                    return user.save();
                }
            }
            return null;
        });
}

function likeMovie(userId,movie) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.likes.push(movie);
            return user.save();
        });
}

function unlikeMovie(movieId,userId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            for(m in user.likes){
                var movie = user.likes[m];
                // console.log(movie.id+" : "+movieId);
                if(parseInt(movie.id) === parseInt(movieId)){
                    user.likes.splice(m,1);
                    return user.save();
                }
            }
            return null;
        });
}

function getLikedMovies(userId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            return user.likes;
        })
}

