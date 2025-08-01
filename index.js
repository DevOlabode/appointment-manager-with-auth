if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const PORT = process.env.PORT || 3000;


const express  = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');

const User = require('./models/user')
const ExpressError = require('./utils/expressError');
const bookingRoutes = require('./routes/booking');
const userRoutes = require('./routes/user');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mongo Connection Open")   
    }).catch((err) => {
        console.log("Error", err) 
    });

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.engine('ejs', ejsMate);

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    cookie : {
        httpOnly: true,
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7, 
        maxAge: 1000 * 60 * 60 * 24 * 7 
    }
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use((req, res, next)=>{
    // console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/booking', bookingRoutes);
app.use('/', userRoutes);

app.get('/', (req, res)=>{
    res.render('appointment/home')
});

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError('Page not found', 404))
});


app.use((err, req, res, next)=>{

    const {statusCode = 500} = err;
    if(!err.message){
        err.message = 'Something Went Wrong!'
    }
    res.status(statusCode).render('appointment/error', { err })
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
