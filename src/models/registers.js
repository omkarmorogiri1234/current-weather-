const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const registerSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            unique:true
        },
        conpassword:{
            type:String,
            required:true,
            unique:true
        }
    }
)


registerSchema.pre("save",function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hash(this.password,12);
        this.conpassword = bcrypt.hash(this.conpassword,12);

    }next();
});

const Register = new mongoose.model("Register",registerSchema);
module.exports = Register;