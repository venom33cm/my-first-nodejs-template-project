const mongoose =require("mongoose");
mongoose.connect("mongodb://localhost:27017/myregistration",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection succesfull");
}).catch((error)=>{
    console.log(error);
})
