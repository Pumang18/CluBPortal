
// dotenv.config();

require("dotenv").config();
const mongoose=require("mongoose")

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongoDb connected");

})
.catch(()=>{
    console.log("failed to connect");
})          


const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})


const collection=new mongoose.model("Collection1",LogInSchema)

module.exports=collection