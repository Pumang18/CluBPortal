
const express=require("express")
const app=express();
const path = require("path")
const hbs=require("hbs")
const ejs=require("ejs")
const collection=require("./mongodb")
const mongodb2 = require("./mongodb2")
const multer = require("multer");
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require("mongoose")
// const bcrypt=require("bcrypt")


const templatePath=path.join(__dirname,"../frontend")
console.log(templatePath)



app.use(express.json())
app.set("view engine","ejs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))
app.use(express.static("../frontend/LoginPage"));
app.use(express.static("../frontend/HomePage"));
app.use(express.static("../frontend/admin"));
app.use(express.static("../frontend/Events"));


app.get("/",(req,res)=>{
    res.render("../frontend/LoginPage/login")
})

app.get("/contactUs",(req,res)=>{
    res.render("../frontend/HomePage/contact")
})

// app.get("/portal",(req,res)=>{
//     res.render("../frontend/HomePage/index")
// })

// app.get("/signup",(req,res)=>{
//     res.render("../frontend/Custom/login")
// })
// app.get("/login",(req,res)=>{
//     res.render("../frontend/Custom/login")
// })


app.post("/",async(req,res)=>{
    const data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password//await(bcrypt.hash(req.body.password,10))
    }

    await collection.insertMany([data])

    res.render("../frontend/LoginPage/login")
})

app.post("/portal",async(req,res)=>{
    try{
        const check=await collection.findOne({email:req.body.login_email})
        console.log(check);
        if(check.password===req.body.password1){
            res.render("../frontend/HomePage/index")
        }
        else if((req.body.password1==="1234")&&(req.body.login_email==="admin")){
            res.render("./admin/index");
        }
        else{
            res.render("../frontend/LoginPage/login",{message:"Wrong Username OR Password"})
        }
    }
    catch{

        if((req.body.password1==="1234")&&(req.body.login_email==="admin")){
            res.render("./admin/index");
        }
        else{
        res.render("../frontend/LoginPage/login",{message:"Wrong Username"})
        }
        // res.redirect("/")
        // res.send(`<script>alert("Wrong Username OR Password"); window.location.href = "/"; </script>`)
    }
})

// Logout
app.get('/logout', function(req, res, next) {

    req.logout();  

    req.session = null;  

    res.redirect('/');
  });

  const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public")

    },
    filename:function(req,file,cb){
        const name = Date.now()+"-"+file.originalname;
        cb(null,name);
    }
})

const upload = multer({storage:storage})

app.get("/notify",(req,res)=>{
    res.render("./admin/index");
})

app.get("/delete",(req,res)=>{
    res.render("./admin/index");
})

// // der("./admin/index");
// })app.get("/notify/delete",(req,res)=>{
// //     res.ren

app.post("/notify",upload.single("image"),async(req,res)=>{
    try{    
        const Data = mongodb2.Data;
        const Name = req.body.clubName
        const User = new mongoose.model(`${Name}`,Data)
    const notify = new User({
        clubName:req.body.clubName,
        description:req.body.description,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/public/' + req.file.filename)),
            contentType: 'image/png'
        },
        date:req.body.date,
    }) 
    const save = await notify.save();

    if(save){
        console.log(req.body.clubName);
        res.render("./admin/index")
    }else{
        res.send("Not Send");
    }
}catch(err){
    console.log(err.message);
}
})


app.post("/delete",(req,res)=>{
    const Data = mongodb2.Data;
        const Name = req.body.del;
        const User = mongoose.model(`${Name}`,Data)
        User.deleteOne(({description:req.body.delete}))
        .then(()=>{
        res.render("./admin/index");
        })
        .catch((err)=>{
            console.log(err.message);
        })
    })

app.get("/events",(req,res)=>{
    res.render("./Events/events");
})


app.post("/events",(req,res)=>{
        const Data = mongodb2.Data;
        const ok= req.body.Club;
        const Na = ok.split(" ")[2];
        // console.log(req.body.Club)
        console.log(Na);
        // console.log(req.body.Club);
        const User = mongoose.model(`${Na}`,Data)
        User.find({})
        .then((x)=>{
            // console.log(req.body.sub);
            res.render("./Events/events",{x,Na});
            console.log(x);
        })
        .catch((y)=>{
            console.log(y);
        })
})

app.listen(process.env.PORT,()=>{
    console.log("Port Connected");
})
