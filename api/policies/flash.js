module.exports = function(req, res, next) {
 res.locals.flash = {};

 // If the flash doesn't exist
 if(!req.session.flash) return next();

 // Copy the current session flash message to
 res.locals.flash = _.clone(req.session.flash);

 // Clear session flash message
 req.session.flash = {};

 next();
};