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
app.use(checkTokenExists);

//Generate a unique token
function generateToken(authLevel){
    token = crypto.randomBytes(64).toString('hex');
    fs.appendFile('./databases/Token.DB',token+" "+authLevel+"\n", error=>{
        if (error){
            console.log("Token failed to register");
        }
    });
    return token;
}


app.get('/',(req,res)=>{
    res.status(200).redirect("/home");
    
});

app.get('/home',(req,res)=>{
    res.status(200).render("home");
});

app.get('/automatedEmails',(req,res)=>{
    res.status(200).render("automatedEmails.ejs");
});

app.get('/login',(req,res)=>{
    if(req.query.login=="failed"){
        res.status(200).render("login",{loginFail: "Login failed: Username or password is incorrect!"});
    }else{
        res.status(200).render("login",{loginFail: ""});
    }
});

//Processing login credentials
app.post('/home',(req,res)=>{
    //Hash the client's provided credentials
    username=hasher.makeHash(req.body.username);
    password=hasher.makeHash(req.body.password);
    regex=new RegExp(username+" "+password+" ([0-9])");
    logins=fs.readFileSync('./databases/Login.DB','utf-8');

    //If the hashed login and password match those in the Login.DB, give the user an auth token which they can use to access the site
    if(regex.test(logins)){
        authLevel=regex.exec(logins)[1]
        res.cookie("token", generateToken(authLevel));
        res.status(302).redirect("/home");
    }else{
        res.status(401).redirect("/login?login=failed");
    }
});




//Middleware
function checkTokenExists(req,res,next){
    //Check if cookies are in Token.DB
    if(req.path=="/login" || (req.method=="POST" && req.path=="/home")){
        next();
    }else if(new RegExp(req.cookies.token).test(fs.readFileSync('./databases/Token.DB','utf-8'))){
        next();
    }else{
        res.status(401).redirect("/login");
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