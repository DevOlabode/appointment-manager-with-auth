const { appointmentSchema } = require('./joiSchema');
const passport = require('passport');


module.exports.isLoggedIn = function(req, res, next){
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first');
        return res.redirect('/login');
    }
    next();
};

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
};

module.exports.validateAppointment = (req, res, next)=>{
    const { error } = appointmentSchema.validate(req.body);
    if(error){
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400)
    }else{
        next()
    }
}

module.exports.loginAuthenticate =  passport.authenticate('local', {
    failureFlash : true,
    failureRedirect : '/login'
});