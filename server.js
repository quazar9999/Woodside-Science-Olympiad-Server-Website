const http = require ('http');
const port = 3000; //change
const server = http.createServer(function(req,res){
    res.write("hello world");
    res.end()
})

server.listen(port,function(error){
    if(error){
        console.log("there was an error: ", error);
    }else{
        console.log("listening on port: ", port);
    }
})