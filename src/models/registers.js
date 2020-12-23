const mongoose = require("mongoose");
const validator = require("validator");
const registerschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid mail id");
            }

        }
    },
    username:{
        type:String,
        required:true,
        minLength:3
    },
    phone:{
        type:Number,
        required:true,
        min:10
    },
    Password:{
        type:String,
        required:true
    }

})

const Register = new mongoose.model("Register",registerschema);
module.exports = Register;