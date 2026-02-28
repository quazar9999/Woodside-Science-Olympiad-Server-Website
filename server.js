/*
TO DO:
    Set up automated mailing
    Set up user auth
        If using cookies
            Create .env file with SHA256 hashed passcodes
            Array of current tokens, after time period pop out token from .env and array
        If using JWT
            More research required
    Port forwarding
*/

const http = require ('http');
const fs = require('fs')
const port = 3000;

const server = http.createServer(function(req,res){

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
        console.log("there was an error: ", error);
    }else{
        console.log("listening on port: ", port);
    }
})