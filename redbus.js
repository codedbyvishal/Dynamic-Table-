const http = require('http');
const url = require('url');
const fs = require('fs');
const ejs = require('ejs');
const db = require('./redbusdb');

const server = http.createServer(function(req,res){
    console.log('Requested URL---->',req.url);
    if(req.url=="/home"){
        fs.readFile("./travel.html",function(err,data){
            if(err){
                res.writeHead(400);
                res.write('error while opening the travel page');
            }
            else{
                res.writeHead(200,{'content-type':'text/html'});
                res.write(data);
            }
        });
    }
     if(req.url=='/createuser'){
        fs.readFile("./redbus.html",function(err,data){
            if(err){
                res.writeHead(400);
                console.log('Error');
            }
            else{
                res.writeHead(200,{'content-type':'text/html'});
                res.write(data);
            }
        })
    }
    else if(req.url.indexOf("insertuser")>0){
        console.log("running");
        var y = url.parse(req.url,true);
        console.log(y.query);
        db.createuser(y.query);
        res.writeHead(200,{'content-type':'text/html'});


    }
    else if(req.url=="/list"){

        db.listuser(function(list){
            console.log(list);
            var htmlContent = fs.readFileSync(__dirname +'/buslist1.ejs','utf8');
            var htmlRenderized = ejs.render(htmlContent,{data:list});
            res.write(htmlRenderized);
        });
        console.log("end of the bus user list");
    }
    else if(req.url.indexOf("userlist")>0){
        console.log('requsted url ---->',req.url)
        var ur = url.parse(req.url,true);
        console.log(ur.query);
        db.selectbus(ur.query,function(list){
        
            console.log(list);
            var htmlContent = fs.readFileSync(__dirname +'/buslist1.ejs','utf8');
            var htmlRenderized = ejs.render(htmlContent,{data:list});
            res.write(htmlRenderized);
        });
    }
    else if(req.url=="/delete"){
        fs.readFile("./busdelete.html",function(err,data){
            if(err){
                console.log("error while deleting")
            }
            else{
                res.writeHead(200,{'content-type':'text/html'});
                res.write(data);
            }
        })
    }
    else if(req.url.indexOf("backtolist")>0)
    {
        var remove = url.parse(req.url,true);
        console.log(remove.query);
        db.deleteuser(remove.query);
        console.log('testing');
        fs.readFile("./redbus.html",function(err,data){
            console.log('running delete list');
            res.write(data);
        })
    }


});
server.listen(6969);
console.log("http://localhost:6969/createuser");
console.log("http://localhost:6969/home");