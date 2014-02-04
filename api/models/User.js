/**
 * Users
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

 var User = {
 	// Define a custom table name
	tableName: 'user',

	// Set schema true/false for adapters that support schemaless
	schema: true,

	// Define an adapter to use
	adapter: 'postgresql',


 	attributes: {
 		userName: {
 			type: 'string',
 			maxLength: 20,
 			unique: true,
 			required: true
 		},
 		encryptedPassword: {
 			type: 'string',
 			required: true,
 			minLength: 6
 		},
 		admin: {
 			type: 'boolean',
 			defaultsTo: 'false'
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