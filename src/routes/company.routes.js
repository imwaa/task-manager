const {Router} = require("express")

const router = Router()


const {renderClients, renderEmployees,renderMemberForm, renderStaffMembers,CreateNewMember} = require('../controllers/company.controller')

const{isStaff, isStaffOrEmployee,isAuthenticated} = require('../helpers/auth')

router.get('/company/Employees', isAuthenticated,isStaffOrEmployee,renderEmployees)

router.get('/company/clients',isAuthenticated,isStaffOrEmployee, renderClients)

router.get('/company/staff-member', isAuthenticated,isStaff,renderStaffMembers)

router.get('/company/add-member', isAuthenticated,isStaff,renderMemberForm)

router.post('/company/add-member', CreateNewMember)


module.exports = router