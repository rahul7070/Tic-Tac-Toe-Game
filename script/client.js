let socket=io("http://localhost:8500/",{transports:["websocket"]})

let cell1=document.getElementById("cell-1")
let cell2=document.getElementById("cell-2")
let cell3=document.getElementById("cell-3")
let cell4=document.getElementById("cell-4")
let cell5=document.getElementById("cell-5")
let cell6=document.getElementById("cell-6")
let cell7=document.getElementById("cell-7")
let cell8=document.getElementById("cell-8")
let cell9=document.getElementById("cell-9")

let player1=document.getElementById("player1")
let player2=document.getElementById("player2")


socket.on("gameBegins",(message)=>{
    console.log(message)

})

socket.on("game",(data)=>{
    console.log(data)
        player1.innerText=data.player[0].id
        player2.innerText=data.player[1].id

        for(let j=0;j<data.player.length;j++){
            if(data.board[0][0]==data.player[j].id){
                cell1.innerHTML=data.player[j].symbol
            }
            if(data.board[0][1]==data.player[j].id){
                cell2.innerHTML=data.player[j].symbol
            }
            if(data.board[0][2]==data.player[j].id){
                cell3.innerHTML=data.player[j].symbol
            }
            if(data.board[1][0]==data.player[j].id){
                cell4.innerHTML=data.player[j].symbol
            }
            if(data.board[1][1]==data.player[j].id){
                cell5.innerHTML=data.player[j].symbol
            }
            if(data.board[1][2]==data.player[j].id){
                cell6.innerHTML=data.player[j].symbol
            }
            if(data.board[2][0]==data.player[j].id){
                cell7.innerHTML=data.player[j].symbol
            }
            if(data.board[2][1]==data.player[j].id){
                cell8.innerHTML=data.player[j].symbol
            }
            if(data.board[2][2]==data.player[j].id){
                cell9.innerHTML=data.player[j].symbol
            }
            
        }
        if(data.win){
            console.log(`user ${data.win} win the game`)
            if(data.win!=="draw"){
            
            document.getElementById("winner").innerText=`user ${data.win} win the game`
            }
            else{
                document.getElementById("winner").innerText="draw..."   
            }
            const box = document.querySelectorAll('.cell');
            setTimeout(()=>{
            box.forEach((box)=>{
                box.innerHTML=null
            })
            document.getElementById("winner").innerText=null
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    data.board[i][j]=null
                }
             }
             data.win=null
             socket.emit("newgame",data)
             console.log(data,"***********")
            
        },5000)
         
        }

      console.log(socket.id)
    let isnext=false
    if(data.nextplayer==socket.id){
        isnext=true
    }
      console.log(isnext)
    if(data.player.length==2 ){
    const cells = document.querySelectorAll('.cell');
      cells.forEach((cell) => {
    
      cell.addEventListener('click', onClick);
     });
    }
     
     function onClick(event) {
      console.log(isnext,"8")
    if(isnext==true){
       if(data.player[0].id==socket.id){
        event.target.innerHTML=data.player[0].symbol
       }
       if(data.player[1].id==socket.id){
        event.target.innerHTML=data.player[1].symbol
       }
      let clickedcell=new Array()
      clickedcell.push(event.target.id)
      clickedcell.push(socket.id)
      socket.emit("clicked",clickedcell)
       
    // remove event listener from clicked cell
     event.target.removeEventListener('click', onClick);
     isnext=false
    }
     }
    

})