/**
 * UsersController
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

module.exports = {

	index: function(req, res) {
		User.findAll(function(err, users){
			if (err) return res.send(err, 500);

			res.view({
				model: users
			});
		});
  },

	new: function(req, res) {
		res.view();
  },

 	create: function(req, res, next) {
 		var userObj = {
      username: req.param('username'),
      password: req.param('password'),
      confirmation: req.param('confirmation')
    }

    // Create a User with the params sent from 
    User.create(userObj, function userCreated(err, user) {

      // If there's an error
      if(err) {
        console.log(err);

        // If error redirect back to sign-up page
        // return res.redirect('/user/new');
      }
      res.json(user);

    //   // Log user in
    //   // req.session.authenticated = true;
    //   // req.session.User = user;

    //   user.save(function(err, user) {
    //     if(err) {
    //     	console.log(err);
  				
  		// 		return next(err);
  		// 	}

    //   // Let other subscribed sockets know that the user was created.
    //   User.publishCreate(user);

    //     // After successfully creating the user redirect to the show action
    //     res.redirect('/user/show/' + user.id);
    //   });
    });
  },

  show: function(req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  }

  // login: function(req, res) {
  //   var bcrypt = require('bcrypt');

  //   User.findOneByEmail(req.body.email).done(function (err, user) {
  //     if (err) res.json({ error: 'DB error' }, 500);

  //     if (user) {
  //       bcrypt.compare(req.body.password, user.password, function (err, match) {
  //         if (err) res.json({ error: 'Server error' }, 500);

  //         if (match) {
  //           // password match
  //           req.session.user = user.id;
  //           res.json(user);
  //         } else {
  //           // invalid password
  //           if (req.session.user) req.session.user = null;
  //           res.json({ error: 'Invalid password' }, 400);
  //         }
  //       });
  //     } else {
  //       res.json({ error: 'User not found' }, 404);
  //     }
  //   });
  // }


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UsersController)
   */
  // _config: {}

  
};
