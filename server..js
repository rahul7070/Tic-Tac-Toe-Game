let express=require("express")
let app=express()
let http=require("http")
const { connected } = require("process")
let socketio=require("socket.io")
let server=http.createServer(app)
let io=socketio(server)

let matrix=[]
for(let i=0;i<3;i++){
    let arr=new Array(3).fill(null)
    matrix.push(arr)
}

let gamestatus={
    player:[],
    board:matrix,
    nextplayer:"",
    win:null,
    winnerdata:[]
   }


io.on("connection",(socket)=>{
    console.log("player connected to"+socket.id)
     
    gamestatus.player.push({
        id:socket.id,
        symbol:gamestatus.player.length==0 ?"x":"o"
    })

    if(gamestatus.player.length==2){
        gamestatus.nextplayer=gamestatus.player[0].id
        io.emit("gameBegins","gameBegins")
    }

    io.emit("game",gamestatus)

    socket.on("clicked",(data)=>{
        
        //finding nextplayer
        if(data[1]==gamestatus.nextplayer){
           
            let filter=gamestatus.player.filter((ele)=>{
             return ele.id!=data[1]
            })
            gamestatus.nextplayer=filter[0].id
        }
        
        // adding the clied user to the gae board
        if(data[0]=="cell-1"){
            gamestatus.board[0][0]=data[1]
        }
        else if(data[0]=="cell-2"){
            gamestatus.board[0][1]=data[1]
        }
        else if(data[0]=="cell-3"){
            gamestatus.board[0][2]=data[1]
        }
        else if(data[0]=="cell-4"){
            gamestatus.board[1][0]=data[1]
        }
        else if(data[0]=="cell-5"){
            gamestatus.board[1][1]=data[1]
        }
        else if(data[0]=="cell-6"){
            gamestatus.board[1][2]=data[1]
        }
        else if(data[0]=="cell-7"){
            gamestatus.board[2][0]=data[1]
        }
        else if(data[0]=="cell-8"){
            gamestatus.board[2][1]=data[1]
        }
        else if(data[0]=="cell-9"){
            gamestatus.board[2][2]=data[1]
        }
        
        // checking draw or not
        function checkdraw(){
            let count=0
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(gamestatus.board[i][j]){
                        count++
                    }
                }
            }
            if(count==9){
                return true
            }
        }
       //checking winner
        function checkwin(){

        for(let i=0;i<3;i++){
            if((gamestatus.board[i][0]==gamestatus.board[i][1] && gamestatus.board[i][1]==gamestatus.board[i][2]) && gamestatus.board[i][0] !=null  && gamestatus.board[i][1] !=null && gamestatus.board[i][1] !=null){
                return true
            }
        }
        console.log()
        for(let i=0;i<3;i++){
            if((gamestatus.board[0][i]==gamestatus.board[1][i] && gamestatus.board[1][i]== gamestatus.board[2][i]) && gamestatus.board[0][i] !=null  && gamestatus.board[1][i] !=null && gamestatus.board[2][i] !=null){
                return true
            }
        }
      
         if((gamestatus.board[0][0]==gamestatus.board[1][1] &&gamestatus.board[1][1]== gamestatus.board[2][2]) 
         && gamestatus.board[0][0]!==null && gamestatus.board[1][1]!==null && gamestatus.board[2][2]!==null){
            return true
         }
    
         if((gamestatus.board[0][2]==gamestatus.board[1][1] &&gamestatus.board[1][1]== gamestatus.board[2][0]) && gamestatus.board[0][2]!==null && gamestatus.board[1][1]!==null && gamestatus.board[2][0]!==null){

            return true
         }

         return false
       }

       if(checkwin()){
        gamestatus.winnerdata.push(socket.id)
        gamestatus.win=socket.id
       }
       else if(checkdraw()){
        gamestatus.winnerdata.push("draw")
        gamestatus.win="draw"
       }
       console.log(gamestatus)
  
        io.emit("game",gamestatus)

    })

    socket.on("newgame",(data)=>{
        gamestatus.board=data.board
        gamestatus.win=data.win
        io.emit("game",gamestatus)
    })


    
})





server.listen(8500,async()=>{
    try{
       console.log("server is running on 8500")
    }
    catch(err){
        console.log(err.message)
     
    }
})