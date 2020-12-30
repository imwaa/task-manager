const companyCtrl = {}

const User = require('../models/User')

companyCtrl.renderMemberForm = (req, res) =>{
    res.render('company/add-member')
}

companyCtrl.CreateNewMember = async (req, res)=>{
    const errors = []
    const {name, email, password, confirm_password, role} = req.body
    if(password != confirm_password){
        errors.push({text: 'Passwords do not match'})
    }
    if(password.length < 5){
        errors.push({text :'Passwords must be at last 5 caracters'})
    }

    if(errors.length > 0){
        res.render('/company/add-member',{
            errors,
            name,email
        })
    }
    else{
       const emailUser = await User.findOne({email})
       if(emailUser){
           req.flash('error_msg', 'The email is alredy in use')
           res.redirect('/company/add-member')
       }else{
            const newUser = new User({name, email, password,role})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('succes_msg','User Created')
            res.redirect('/company/add-member')
       }
    }
}


companyCtrl.renderClients = async(req,res)=>{
    const Clients = await User.find({role: "client"}).sort({createdAt :'desc'}).lean()
    res.render('company/all-clients',{Clients})
}

companyCtrl.renderEmployees = async(req,res)=>{
    const Employee = await User.find({role: "employee"}).sort({createdAt :'desc'}).lean()
    res.render('company/all-employees',{Employee})
}

companyCtrl.renderStaffMembers = async(req,res)=>{
    const StaffMember = await User.find({role: "staff-member"}).sort({createdAt :'desc'}).lean()
    res.render('company/all-staff-members',{StaffMember})
}

module.exports = companyCtrl