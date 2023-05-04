
let express=require("express")
let app=express()
Socketio=require("socket.io")
let http=require("http")


let server=http.createServer(app)

let io=Socketio(server)

let user={}

let symbol=["x","o"]

let click=[]

let count=0
io.on("connection",(socket)=>{
    count++
    if(count<=2){
    user[socket.id]=true
    socket.emit("clientid",socket.id)
    }
    if(count>2){
        socket.emit('message',"not allowed");
        socket.disconnect(true)
        count=2
        
    }
    
    console.log(user,"***")
    if(Object.keys(user).length==2){
        io.emit("gamebegins",{"msg":"start game","users":user})
        
    }
     socket.emit("hello","hello")

     socket.on("done",(message)=>{
        console.log(message,"*=")
        for(let key in user){
            if(key!=message){
                socket.emit("next",key || "first move")
            }
        }
     })
 
    socket.on("fromclick",(message)=>{
        // console.log(message,"msg")
        if(click.length==0){
            click.push(message)
        }
        else{
            let x=true
        for(let i=0;i<click.length;i++){
            if(click[i].cell==message.cell){
                x=false
            }
        }
        if(x==true){
            click.push(message)
        }
        }
        console.log(click,"click") 
        socket.emit("clickdata",click)
    })


    socket.on("disconnect",()=>{
        count--
        delete user[socket.id]
        console.log(user)
        
    })
})



server.listen(8600,async()=>{
    try{
       console.log("server is running on 8600")
    }
    catch(err){
        console.log(err.message)
     
    }
})
