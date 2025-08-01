const User = require('../models/user');


module.exports.registerForm = (req, res)=>{
    res.render('user/register')
};

module.exports.register = async(req, res)=>{
    try{
        const { username, email, password } = req.body;
        const user = new User({username, email});
        const registeredUser = await User.register(user, password);

        req.login(registeredUser, (err)=>{
            if(err) return next(err);

            req.flash('success', 'Welcome to Appointment Manager');
            const redirectUrl = res.locals.returnTo || '/'
            res.redirect(redirectUrl);
        })
    }catch(err){
        req.flash('error', err.message);
        res.redirect('/register')
    }
};

module.exports.loginForm = (req, res)=>{
    res.render('user/login')
};

module.exports.login = async(req, res)=>{
    req.flash('success', 'Log in successfully');
    const redirectUrl = res.locals.returnTo || '/'
    res.redirect(redirectUrl)
};

module.exports.logout = (req, res)=>{
    req.logout(function(err){
        if(err) return next(err);
        req.flash('success', 'Successfully Logged out your account');
        res.redirect('/')
    });
};

module.exports.userInfo = async(req, res)=>{
    res.render('user/info');
}