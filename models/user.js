var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

//create a Schema
var userSchema = mongoose.Schema({
	username: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	name: {
		type: String
	},
	join_date: {
		type: Date
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
});

var User = module.exports = mongoose.model('User', userSchema);

//Get user by id
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

//compare password
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if(err){
			return callback(err);
		} else {
			callback(null, isMatch);
		}
	});
}