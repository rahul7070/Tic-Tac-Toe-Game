let socket=io("http://localhost:8500/",{transports:["websocket"]})

const urlParams=new  URLSearchParams(window.location.search)
let username=urlParams.get("username")
let room=urlParams.get("room")


const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const  userList = document.getElementById("users");


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
let userdisplayname=document.getElementById("user-display-name")
userdisplayname.innerText=username

let r1p1=document.getElementById("r1-p1")
let r1p2=document.getElementById("r1-p2")
let r2p1=document.getElementById("r2-p1")
let r2p2=document.getElementById("r2-p2")
let r3p1=document.getElementById("r3-p1")
let r3p2=document.getElementById("r3-p2")

function addcolor(cell){
    if(cell.innerHTML=="x"){
        cell.classList.add("cell-red")
    }
    else if(cell.innerHTML=="o"){
        cell.classList.add("cell-blue")
    }
}
 
socket.on("gameBegins",(message)=>{
    console.log(message)

})
let users={
    username:username,
    room:room
}

socket.emit("users",users)

socket.on("game",(data)=>{
    console.log(data)
        player1.innerText=data.player[0].name
        player2.innerText=data.player[1].name
      
        // updating cell innerhtml..........
        for(let j=0;j<data.player.length;j++){
            if(data.board[0][0]==data.player[j].name){
                cell1.innerHTML=data.player[j].symbol
                addcolor(cell1)
            }
            if(data.board[0][1]==data.player[j].name){
                cell2.innerHTML=data.player[j].symbol
                addcolor(cell2)
            }
            if(data.board[0][2]==data.player[j].name){
                cell3.innerHTML=data.player[j].symbol
                addcolor(cell3)
            }
            if(data.board[1][0]==data.player[j].name){
                cell4.innerHTML=data.player[j].symbol
                addcolor(cell4)
            }
            if(data.board[1][1]==data.player[j].name){
                cell5.innerHTML=data.player[j].symbol
                addcolor(cell5)
            }
            if(data.board[1][2]==data.player[j].name){
                cell6.innerHTML=data.player[j].symbol
                addcolor(cell6)
            }
            if(data.board[2][0]==data.player[j].name){
                cell7.innerHTML=data.player[j].symbol
                addcolor(cell7)
            }
            if(data.board[2][1]==data.player[j].name){
                cell8.innerHTML=data.player[j].symbol
                addcolor(cell8)
            }
            if(data.board[2][2]==data.player[j].name){
                cell9.innerHTML=data.player[j].symbol
                addcolor(cell9)
            }
            
        }
       
        if(data.win){
            // updating leaderboard.....
            if(data.winnerdata[0]){
            if(data.winnerdata[0]==data.player[0].name){
                r1p1.innerHTML="win"
                r1p2.innerHTML="lose"
            }
            if(data.winnerdata[0]==data.player[1].name){
                r1p1.innerHTML="lose"
                r1p2.innerHTML="win"
            }
            if(data.winnerdata[0]=="draw"){
                r1p1.innerHTML="draw"
                r1p2.innerHTML="draw"
            } 
           }
           if(data.winnerdata[1]){
            if(data.winnerdata[1]==data.player[0].name){
                r2p1.innerHTML="win"
                r2p2.innerHTML="lose"
            }
            if(data.winnerdata[1]==data.player[1].name){
                r2p1.innerHTML="lose"
                r2p2.innerHTML="win"
            }
            if(data.winnerdata[1]=="draw"){
                r2p1.innerHTML="draw"
                r2p2.innerHTML="draw"
            }
           }
           if(data.winnerdata[2]){
            if(data.winnerdata[2]==data.player[0].name){
                r3p1.innerHTML="win"
                r3p2.innerHTML="lose"
            }
            if(data.winnerdata[2]==data.player[1].name){
                r3p1.innerHTML="lose"
                r3p2.innerHTML="win"
            }
            if(data.winnerdata[2]=="draw"){
                r3p1.innerHTML="draw"
                r3p2.innerHTML="draw"
            }
           }
            
           // checking who is overall winner in total rounds
           if(data.winnerdata.length==3){
              let obj={}
              for(let i=0;i<data.winnerdata.length;i++){
                if(!obj[data.winnerdata[i]]){
                    obj[data.winnerdata[i]]=1
                }
                else{
                    obj[data.winnerdata[i]]++
                }
              }
              
        
              let winner=null
              for(let key in obj){
                if(obj[key]>1){
                    winner=key
                }
              }
              let overallwinner=document.getElementById("overallwinner")
              if(winner=="draw"){
                overallwinner.innerHTML="draw"
              }
              else{
                overallwinner.innerHTML=`player ${winner} win the game`
              }
             
           }

            // showing message if player win....
            if(data.win!=="draw"){
            
            //   adding colour to the winning path
             data.winningline.forEach((ele)=>{
                if(ele[0]==0 && ele[1]==0){
                    cell1.classList.add("cell-path")
                }
                if(ele[0]==0 && ele[1]==1){
                    cell2.classList.add("cell-path")
                }
                if(ele[0]==0 && ele[1]==2){
                    cell3.classList.add("cell-path")
                }
                if(ele[0]==1 && ele[1]==0){
                    cell4.classList.add("cell-path")
                }
                if(ele[0]==1 && ele[1]==1){
                    cell5.classList.add("cell-path")
                }
                if(ele[0]==1 && ele[1]==2){
                    cell6.classList.add("cell-path")
                }
                if(ele[0]==2 && ele[1]==0){
                    cell7.classList.add("cell-path")
                }
                if(ele[0]==2 && ele[1]==1){
                    cell8.classList.add("cell-path")
                }
                if(ele[0]==2 && ele[1]==2){
                    cell9.classList.add("cell-path")
                }
                
             })
            document.getElementById("winner").innerText=`user ${data.win} win the game`
            }
            else{
                document.getElementById("winner").innerText="draw..."   
            }
            data.win=null
            data.winningline=[]
            socket.emit("newround",data)
            const box = document.querySelectorAll('.cell');
            box.forEach((box)=>{
                addcolor(box)
            })
            setTimeout(()=>{
            box.forEach((box)=>{
                box.innerHTML=null
                box.classList.remove("cell-red")
                box.classList.remove("cell-blue")
                box.classList.remove("cell-path")
            })
            document.getElementById("winner").innerText=null

            
          },5000)
          
        }

      console.log(socket.id)
    let isnext=false
    if(data.nextplayer==username){
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
       if(data.player[0].name==username){
        event.target.innerHTML=data.player[0].symbol
       }
       if(data.player[1].name==username){
        event.target.innerHTML=data.player[1].symbol
       }
      let clickedcell=new Array()
      clickedcell.push(event.target.id)
      clickedcell.push(username)
      socket.emit("clicked",clickedcell)
       console.log(clickedcell)
    // remove event listener from clicked cell
     event.target.removeEventListener('click', onClick);
     isnext=false
    }
     }

})


// message part......................
  
   
socket.emit("joinRoom",({username,room}));
socket.on("message",(message)=>{
    console.log(message)
    outputMessage(message);
 
})

socket.on('errorMessage',(msg)=>{
    maxlimit()
    document.getElementsByTagName('h1').innerText = msg
})


function maxlimit(){
    window.location.href = 'MaxPlayer.html'
}
// Sending message

chatForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    let msg  = e.target.elements.msg.value;

    msg  = msg.trim();

    if(!msg){
        return false;
    }

    socket.emit('chatMessage',msg);
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();

})

// socket.on("roomUsers",({room,users})=>{

//     roomName.innerText= room;

// outputRoomUsers(users)

// })


// function outputRoomUsers(users){
    
//     userList.innerHTML = '';

//     users.forEach(user => {
//         const li = document.createElement("li");
//         li.innerText = user.username;
//         userList.appendChild(li)
//     });
// }


function outputMessage(message){

    const msgbox = document.createElement("div");
     msgbox.setAttribute("class","msgbox")
    let msg=document.createElement("div")
    msg.setAttribute("class","msg")
    let text=document.createElement("div")
    text.setAttribute("class","text")
    text.innerHTML=message.text
    let time=document.createElement("p")
    time.setAttribute("class","time")
    time.innerText=message.time
    msg.append(text,time)

    if(message.username==username){
        msgbox.classList.add("right-side")
    }
    else{
        msgbox.classList.add("left-side")
    }
    
    msgbox.append(msg)
    chatMessages.appendChild(msgbox);
    
}