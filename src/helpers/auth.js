const helpers = { }

helpers.isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        //console.log(res.locals.user.role)
        //req.flash('role', res.locals.user.role)
        return next()
    }
    req.flash('error_msg','You are not Logged')
    res.redirect('/users/signin')
}

helpers.isStaff = (req, res, next)=>{
    console.log(req.user.role)
    if(req.user.role === "staff-member")
    {
        return next()
    }
    req.flash('error_msg','You are not a Staff-member')
    res.redirect('/notes')

}

helpers.isStaffOrEmployee = (req, res, next)=>{
    console.log(req.user.role)
    if(req.user.role === "staff-member" || req.user.role === "employee"  )
    {
        return next()
    }
    req.flash('error_msg','You have no Authorisations')
    res.redirect('/notes')

}



module.exports = helpers