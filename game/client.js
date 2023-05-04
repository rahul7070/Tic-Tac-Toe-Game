

// document.getElementById("cell-1").inn

let socket=io("http://localhost:8600/",{transports:["websocket"]})

socket.on("next",(data)=>{
  console.log(data,"..")


 })


socket.on("clientid",(clientid)=>{
  console.log(clientid)

  socket.on("gamebegins",(message)=>{
    console.log(message)
      if(message.msg=="start game"){
  
        const cells = document.querySelectorAll('.cell');
        // if(data==clientid ||data==null){
           cells.forEach((cell) => {
          cell.addEventListener('click', onClick);
         });
        // }
  
          function onClick(event) {
          socket.emit("done",clientid )
          let keys=Object.keys(message.users)
          let firstkey=keys[0]
          let secondkey=keys[1]
          if(clientid==firstkey){
             event.target.innerHTML = "x";
          }
          else if(clientid==secondkey){
            event.target.innerHTML = "0";
          }
          const clickedCell = event.target.id;
          socket.emit("fromclick", {"msg": "clicked", "id": clientid, "cell": clickedCell,value:event.target.innerHTML});
         
          // remove event listener from clicked cell
          event.target.removeEventListener('click', onClick);
           }
          
                
            }
     })
  
})






