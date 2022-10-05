const http = require("http");
const { off } = require("process");
const server = http.createServer((req,res)=>{
    const {method,url} = req;
    const todos=[
        {
            id:1,text:'TodoOne'
        },
        {
            id:2,text:'TodoTwo'
        },
        {
            id:3,text:'TodoThree'
        }
    ]
    //text/plain for simple rendering of strings
    //text/html to show them within tags
//     res.statusCode=404;
//    res.setHeader('Content-type',"application/json")
//    res.setHeader('X-Powered-By','Node.js')

let body=[];
req.on('data',chunk=>{
    body.push(chunk);
}).on('end',()=>{
    body=Buffer.concat(body).toString();

    let status= 400;
    const response = {
        succes:false,
        data:null,
        error:null
    }
if(method==='GET' && url ==='/todos')
{
    status=200;
    response.succes=true;
    response.data=todos;

}
else if(method==='POST'&& url==='/todos'){
    const {id,text} = JSON.parse(body);
if(!id && !text){
    status=400;
    response.error="Please add Id and Text"
}
    else if(!id){
status=400;
response.error="Please Add Id"
    }
    else if(!text){
        response.error="Please Add Text"
    }
    else{
    todos.push({id,text})
    status=201;
    response.succes=true;
    response.data=todos;
    }
}
    res.writeHead(status,{
        'Content-type':"application/json",
        'X-Powered-By':'Node.js'
    })
    res.end(JSON.stringify(response));
})


//    res.write("<h1>Hello</h1>")
//    res.write("<h2>Hello Again</h2>")
    

});
const PORT = 5000;

server.listen(PORT,()=>console.log(`Server Running in Port ${PORT}`))