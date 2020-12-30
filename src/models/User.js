const {Schema, model} = require("mongoose")
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name: {
        type: String, required:true
    },

    email : {
        type:String, required:true, unique:true
    },
    password:{
        type:String, required:true
    },

    role:{
        type: String, required:true
    }
},{
    timestamps:true
})

UserSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10) // gensalt nous permet de chosir combien de fois on veut crypter le mdp (10)
    return await bcrypt.hash(password, salt)
}

UserSchema.methods.matchPassword = async function(password){
   return await bcrypt.compare(password,this.password) //true if paswords match, false if not
}

module.exports = model('User', UserSchema)