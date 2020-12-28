const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

})

registerschema.methods.generateAuthToken = async function(){
    try {
        const token =jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token});
        await this.save();
        return token;
    } catch (error) {
        res.send("eroor is "+ error);
        console.log("error is "+ error);
        
    }
}
//hashing
registerschema.pre("save",async function(next){
    if(this.isModified("Password")){
    // console.log(`this is the pass ${this.Password}`);
    this.Password = await bcryptjs.hash(this.Password, 10);
    // console.log(`this is modified pass ${this.Password}`);
    }
    next();
})



const Register = new mongoose.model("Register",registerschema);
module.exports = Register;