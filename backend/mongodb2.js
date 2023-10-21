


require("dotenv").config();

const mongoose = require('mongoose');
const name = require("./index");



const Data = mongoose.Schema({
    clubName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    img:{
        data: Buffer,
        contentType: String
    },
    date:{
        type:String,
        required:true
    }
})

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected Mongo");
})
.catch(()=>{
    console.log("mongodb not connected")
})

module.exports={Data};