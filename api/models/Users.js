/**
 * Users
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

 var User = {

 	attributes: {
 		userName: {
 			type: 'string',
 			unique: true,
 			required: true
 		},
 		password: {
 			type: 'string',
 			required: true,
 			minLength: 6
 		},
 		admin: {
 			type: 'boolean',
 			defaultsTo: 'false'
 		}

 	}

 };

 module.exports = User;