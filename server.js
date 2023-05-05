
const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");
const { userJoin, getRoomUsers, getCurrentUser, userLeave } = require("./chat/msg&user/users");
const formateMessage = require("./chat/msg&user/messages");

const server = http.createServer(app);
const io = socketio(server);

io.on("connection",(socket)=>{

    console.log("One user has joined");

    socket.on("joinRoom", ({ username, room }) => {
      const roomUsers = getRoomUsers(room);
    
      if (roomUsers.length < 2) {
        const user = userJoin(socket.id, username, room);
    
        socket.join(user.room);
    
        socket.emit(
          "message",
          formateMessage("Masai Server", "Welcome to masai Server")
        );

        socket.broadcast
          .to(user.room)
          .emit(
            "message",
            formateMessage("Masai Server", `${username} has joined the chat`)
          );
    
        io.to(room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });


        
     socket.on("chatMessage",(msg)=>{
      const user = getCurrentUser(socket.id);

      io.to(user.room).emit("message",formateMessage(user.username,msg));

   });


    
   socket.on("disconnect",()=>{

      const user = userLeave(socket.id);
          console.log("one user left");
  

         io.to(user.room).emit("message",formateMessage("Masai Server",`${user.username} has left the chat`));
   
         // getting room users.
    io.to(user.room).emit("roomUsers",{
      room:user.room,
      users:getRoomUsers(user.room)
   })
   
          })
  

      } else {
        // if room is full, emit an error message to the client
        socket.emit(
          "errorMessage",
          "Sorry, this room is already full. Please try another room."
        );
      }
    });
    

   
  

})


const PORT = 9090;

server.listen(PORT, ()=>{
    console.log("server is running on port"+PORT)
});
