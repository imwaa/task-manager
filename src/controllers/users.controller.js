const usersCtrl = { }

const passport = require("passport")

const User = require('../models/User')

usersCtrl.renderSignUpForm = (req, res)=>{
    res.render("users/signup")
}

usersCtrl.signup = async (req, res)=>{
    const errors = []
    const {name, email, password, confirm_password} = req.body
    if(password != confirm_password){
        errors.push({text: 'Passwords do not match'})
    }
    if(password.length < 5){
        errors.push({text :'Passwords must be at last 5 caracters'})
    }

    if(errors.length > 0){
        res.render('users/signup',{
            errors,
            name,email
        })
    }
    else{
       const emailUser = await User.findOne({email})
       if(emailUser){
           req.flash('error_msg', 'The email is alredy in use')
           res.redirect('/users/signup')
       }else{
            const newUser = new User({name, email, password})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('succes_msg','You are registered')
            res.redirect('/users/signin')
       }
    }
}

usersCtrl.renderSignInForm= (req,res)=>{
    res.render("users/signin")
}

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect : '/users/signin',
    successRedirect : '/notes',
    failureFlash : true
})

usersCtrl.logout = (req,res)=>{
    req.logout()
    req.flash('succes_msg', 'You are logged out now')
    res.redirect('/users/signin')
}


module.exports = usersCtrl