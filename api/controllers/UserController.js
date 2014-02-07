/**
 * UserController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
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
    User.find(function allUsers(err, users) {
      res.view({users: users});
      // res.json(users);
    });
  },
    
  new: function(req, res) {
    res.view();
  },

  create: function(req, res) {
    var userObj = {
      username: req.param('username'),
      password: req.param('password'),
      confirmation: req.param('confirmation'),
      admin: req.param('admin')
    }

    // Create new user with params from form
    User.create(userObj, function userCreated(err, newUser) {

      // If there's an error
      if(err) {
        // Create a flash message with error
        req.session.flash = {
          err: err
        }
        // Then redirect back to account creation
        return res.redirect('/user/new');
      }

      newUser.save(function(err, newUser) {
        // On creation success redirect to admin main
        res.redirect('/user');
      });
    });
  },

  edit: function(req, res, next) {
    // Find the user from the id passed in via params
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (!user) return next('Sorry that user doesn\'t exist.');
        res.view({user: user});
    });
  },

  update: function(req, res, next) {
    var userObj = {
      username: req.param('username'),
      password: req.param('password'),
      confirmation: req.param('confirmation'),
      admin: req.param('admin')
    }
    
    User.update(req.param('id'), userObj, function userUpdated(err) {
      if (err) {
        return res.redirect('/user/edit/' + req.param('id'));
      }

      res.redirect('/user');
    });
  },

  
};