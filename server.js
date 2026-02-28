const http = require ('http');
const fs = require('fs')
const port = 3000;

const server = http.createServer(function(req,res){
    method = req.method;

    if (method === 'GET'){
        //If the url is blank, redirect to the dashboard
        if(req.url='/.well-known/appspecific/com.chrome.devtools.json'){
            fs.readFile("./site/dashboard.html",function(error,data){
                if(error){
                    res.writeHead(404);
                    res.write("Error: File not found");
                }else{
                    res.write(data);
                }
                res.end();
            })
        }else{
            //Otherwise, load the requested file
            fs.readFile("."+req.url, function(error,data){
                if(error){
                    res.writeHead(404);
                    res.write("Error: File not found");
                }else{
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