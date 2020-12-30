const {
    Router
} = require('express');
const passport = require('passport');

const router = Router();

const {
    renderSignUpForm,
    renderSignInForm,
    signup,
    signin,
    logout,
    renderProfile
} = require("../controllers/users.controller")


router.get('/users/signin', renderSignInForm)

router.get('/users/profile', renderProfile)

router.post('/users/signin', passport.authenticate('local-signin',{
    successRedirect : '/notes',
    failureRedirect: '/users/signin',
    passReqToCallBack: true
}))

router.get('/users/logout', logout)

module.exports = router