/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {
	var adminObj = {
		username: 'admin', 
		password: 'theBoss', 
		confirmation: 'theBoss', 
		admin: true
  }
  var admin = User.findOneByUsername('admin')
	// If no admin is found...
	if(!admin) {
		// Create an admin
	  User.create(adminObj, function adminCreated(err, newAdmin) {
	    newAdmin.save(function(err, newAdmin) {
	      // On creation success redirect to admin main
	      // return res.redirect('/user');
	    });
	  });
	}
  // It's very important to trigger this callack method when you are finished 
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};