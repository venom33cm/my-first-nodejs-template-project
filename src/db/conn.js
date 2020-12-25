const mongoose =require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.ATLAS_URI || "mongodb://localhost:27017/myregistration",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection succesfull");
}).catch((error)=>{
    console.log(error);
})
