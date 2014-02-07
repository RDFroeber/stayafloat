/**
 * Users
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

 module.exports = {

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
 	},

  toJSON: function() {
    var obj = this.toObject();
    delete obj.password;
    delete obj.confirmation;
    delete obj._csrf;
    return obj;
  },

	beforeCreate: function (values, next) {
    // Makes sure the password and password confirmation match
    if (!values.password || values.password != values.confirmation) {
      return next({err: ['Password does not match password confirmation.']});
    }

    // Encrypts the password/confirmation to be stored in the db
    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
    	values.encryptedPassword = encryptedPassword;

    	next();
    });
	}

 };
