/**
 * Users
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

 var User = {
 	adapter: 'postgresql',

 	attributes: {
 		userName: {
 			type: 'string',
 			maxLength: 20,
 			unique: true,
 			required: true
 		},
 		password: {
 			type: 'string',
 			required: true,
 			minLength: 6,
 			columnName: 'encrypted_password'
 		},
 		admin: {
 			type: 'boolean',
 			defaultsTo: 'false'
 		}
 	},

 	beforeCreate: function(values, next) {
	    bcrypt.hash(values.password, 10, function(err, hash) {
		    if(err) return next(err);
		    values.password = hash;
		    next();
	    });
	}

 };

 module.exports = User;