const usersCtrl = { }
const bcrypt = require("bcryptjs")
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User')

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

usersCtrl.renderSignInForm= (req,res)=>{
    res.render("users/signin")
}

usersCtrl.renderProfile = (req,res)=>{
  res.render('users/profile')
}

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  
  }, async(req,email, password, done)=>{
  
   const user = await User.findOne({email: email})
   if(!user){
     return done(null, false, req.flash('error_msg', 'This email does not exist'))
   }
   
   const matchPassword = await bcrypt.compare(password, user.password); 
   if(!matchPassword){
    return done(null, false, req.flash('error_msg', 'Wrong password'))
   }
   console.log(user)
  
   done(null, user)
  }))

// usersCtrl.signin = passport.authenticate('local', {
//     failureRedirect : '/users/signin',
//     successRedirect : '/notes',
//     failureFlash : true
// })


usersCtrl.logout = (req,res)=>{
    req.logout()
    req.flash('succes_msg', 'You are logged out now')
    res.redirect('/users/signin')
}


module.exports = usersCtrl