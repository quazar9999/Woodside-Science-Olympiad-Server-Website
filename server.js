/*
TO DO:
    Set up automated mailing
    Set up user auth
        Use token
        https://www.youtube.com/watch?v=J6NLw0N25UM
    Port forwarding
    Docker integration
*/

//Constants and variables
const express=require('express');
const app=express();
app.set('view engine', 'ejs');
const port = 80;

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));

const cookieParser=require('cookie-parser');
const fs = require('fs');
const crypto = require('crypto');
const { prototype } = require('events');

//Express settings
app.use(cookieParser());
app.use(checkToken);

//Generate a unique token
function generateToken(authLevel){
    token = crypto.randomBytes(64).toString('base64');
    fs.appendFile('./databases/Token.DB',token+" "+authLevel+"\n", error=>{
        if (error){
            console.log("Token failed to register");
        }
    })
    return token;
}


app.get('/',(req,res)=>{
    res.cookie("token",generateToken(1));
    res.redirect("/dashboard");
    
})

app.get('/dashboard',(req,res)=>{
    res.render("dashboard");
})

app.get('/login',(req,res)=>{
    res.render("login");
})

//Middleware
function checkToken(req,res,next){
    //Check if cookies are in Token.DB
    if(new RegExp(req.cookies).test(fs.readFileSync('./databases/Token.DB','utf-8'))){
        next();
    }else{
        console.log("Token doesn't match!");
        req.cookies.token=generateToken(1);
        res.redirect("/login");
    }
}

//Reset Token.DB contents
fs.writeFile('./databases/Token.DB','', error=>{
    if(error){
        console.log("Error when purging Token.DB:", error);
        process.exit(1)
    }
    console.log("Purged Token.DB");
})


app.listen(port);