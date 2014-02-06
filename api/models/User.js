/**
 * Users
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

 var User = {

	// Define an adapter to use
	adapter: 'postgresql',


 	attributes: {
 		username: {
 			type: 'string',
 			maxLength: 20,
 			unique: true,
 			required: true
 		},
 		encryptedPassword: {
 			type: 'string'
 		},
 		admin: {
 			type: 'boolean',
 			defaultsTo: false
 		}
 	}

 // 	beforeCreate: function(values, next) {
	//     bcrypt.hash(values.password, 10, function(err, hash) {
	// 	    if(err) return next(err);
	// 	    values.password = hash;
	// 	    next();
	//     });
	// }

 };

 module.exports = User;