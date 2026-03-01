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
const cookieParser=require('cookie-parser');
const fs = require('fs');
const crypto = require('crypto');

//Express settings
app.use(cookieParser());

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
    console.log(req.cookies);
    res.render("dashboard");
})

//Reset Token.DB contents
fs.writeFile('./databases/Token.DB','', error=>{
    if(error){
        console.log("Error when purging Token.DB:", error);
        process.exit(1)
    }
    console.log("Purged Token.DB");
})


app.listen(port);

/*const server = http.createServer(function(req,res){
    
    //Cookie parsing

    if (req.method === 'GET'){
        //If the url is blank, make it direct to the dashboard
        if(req.url == '/'){
            res.writeHead(302,{
                'Location': './site/dashboard.html'
            });
            res.end();
        }else{
            //Otherwise, load the requested file
            fs.readFile("."+req.url, function(error,data){
                if(error){
                    res.writeHead(404);
                    res.write("Error: File not found");
                }else{
                    res.writeHead(200);
                    res.write(data);
                } 
                res.end();
            })
        }
    } 
    
})

server.listen(port,function(error){
    if(error){
        console.log("Port listening error: ", error);
        return;
    }
    console.log("Listening on port:", port);
    
    fs.unlink('./databases/Token.DB', error=>{
        if(error){
            console.log("Error occured when purging Token.DB:", error);
            return;
        }
        console.log("Purged Token.DB");
    })
    fs.writeFile('./databases/Token.DB','',error=>{
        if(error){
            console.log("Error occured when creating Token.DB", error);
            return;
        }
        console.log("Token.DB created\n");
    })
    
})*/