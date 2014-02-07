/**
 * SessionController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {
	new: function(req, res) {
		res.view();
  },

  create: function(req, res) {
  	// If the current user is not logged in (params username and password do not exist)
		if(!req.param('username') || !req.param('password')) {
			// Create flash error message
			req.session.flash = {
	      err: 'You must enter a username and password.'
	    }
	    // Redirect back to the login
			res.redirect('/session/new');
		}

		// Find the user by their username 
		User.findOneByUsername(req.param('username'), function foundUser(err, user) {
			// If no user is found...
			if(!user) {
				req.session.flash = {
					err: 'The username ' + req.param('username') + ' does not exist.'
				}
				// Redirect back to the login
				res.redirect('/session/new');
			}

			// Compare password from the params to the encrypted password of the found user
			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
				// If the password from the form doesn't match the password from the database...
				if(!valid) {
					req.session.flash = {
						err: 'Invalid username and password combination.'
					}
					// Redirect back to the login
					res.redirect('/session/new');
				}

				// If username is found and matches the password, log the user in
				req.session.authenticated = true;
				// Set the current user for the session
				req.session.User = user;

				user.save(function(err, user) {
					// If user is an admin redirect to admin main
					if(user.admin) {
						return  res.redirect('/user');
					}
					return res.redirect('/');
				});
			});
		});
	},

	destroy: function(req, res, next) {
		User.findOne(user.id, function foundUser(err, user) {

			var userId = req.session.User.id;

			if(user) {
				// Wipe out the session (log out)
				req.session.destroy();

				// Redirect the browser to the sign-in screen
				res.redirect('/session/new');
			} else {
				// Wipe out the session (log out)
				req.session.destroy();

				// Redirect the browser to the sign-in screen
				res.redirect('/session/new');
			}
		});
	}

  
};
