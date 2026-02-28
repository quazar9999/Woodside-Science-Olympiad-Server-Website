/*
TO DO:
    Set up automated mailing
    Set up user auth
        Use token
        https://www.youtube.com/watch?v=J6NLw0N25UM
    Port forwarding
    Docker integration
*/

const http = require ('http');
const fs = require('fs')
const port = 80;

const server = http.createServer(function(req,res){
    
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
    
})