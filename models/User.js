var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); //for hashing password

var UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String
});

//make sure this is above the model definition
//this is a method that is going to be used on this schema's model
//this method is to have our custom json method to display everything
//in the model expcept the password, so delete it
UserSchema.methods.toJSON = function() {
	var user = this.toObject();
	delete user.password;
	return user;
};

UserSchema.methods.comparePasswords = function(password, callback) {
	bcrypt.compare(password, this.password, callback);
};

//just before saving (pre save), convert the password into a hash form
UserSchema.pre('save', function(next){
	var user = this;

	//could be in situations where there is an update of a column
	//other than the password, so we do this only when password
	//has changed
	if (!user.isModified('password')) {
		return next;
	}

	//get a salt to randomise our hash
	//iterate a suggested value of 10
	//the salt is received in the callback
	bcrypt.genSalt(10, function(err, salt){
		
		if (err) return next(err);

		//pass the password received from the frontend and the salt
		//get the hash that is the encrypted password in the callback
		bcrypt.hash(user.password, salt, null, function(err, hash){

			if (err) return next(err);

			//if we got a hash and not an error, override the password
			//with the received encrypted password
			user.password = hash;
			
			next();

		});
	});

});

//var User = mongoose.model('User', UserSchema);
//exports.model = mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);
