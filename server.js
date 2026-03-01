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
const hasher = require('./hasher.js');

//Express settings
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(checkToken);

//Generate a unique token
function generateToken(authLevel){
    token = crypto.randomBytes(64).toString('base64');
    fs.appendFile('./databases/Token.DB',token+" "+authLevel+"\n", error=>{
        if (error){
            console.log("Token failed to register");
        }
    });
    return token;
}


app.get('/',(req,res)=>{
    res.cookie("token",generateToken(1));
    res.redirect("/dashboard");
    
});

app.get('/dashboard',(req,res)=>{
    res.render("dashboard");
});

app.get('/login',(req,res)=>{
    if(req.query.login=="failed"){
        res.render("login",{loginFail: "Login failed: Username or password is incorrect!"});
    }else{
        res.render("login",{loginFail: ""});
    }
});

app.post('/dashboard',(req,res)=>{
    username=hasher.makeHash(req.body.username);
    password=hasher.makeHash(req.body.password);
    if(new RegExp(username+" "+password).test(fs.readFileSync('./databases/Login.DB','utf-8'))){
        res.redirect("/dashboard");
    }else{
        res.redirect("/login?login=failed");
    }
});




//Middleware
function checkToken(req,res,next){
    //Check if cookies are in Token.DB
    if(new RegExp(req.cookies.token).test(fs.readFileSync('./databases/Token.DB','utf-8'))){
        next();
    }else{
        console.log("Token doesn't match!");
        console.log(req.cookies.token);
        res.cookie("token", generateToken(1));
        res.redirect("/login");
    }
}

//Reset Token.DB contents
fs.writeFile('./databases/Token.DB','', error=>{
    if(error){
        console.log("Error when purging Token.DB:", error);
        process.exit(1);
    }
    console.log("Purged Token.DB");
})


app.listen(port);