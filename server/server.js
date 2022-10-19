const path = require('path');
const express = require("express");
const http = require('http');
const socketIo = require('socket.io');

const port = process.env.PORT || 8000
const publicPath = path.join(__dirname, '/../public');
let app = express();
let server = http.createServer(app);
let io = socketIo(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log("A new user just connected");

    socket.emit("newMessage", {
        from : "Admin",
        text : "Welcome to the chat box",
        createdAt : new Date().getTime()
    });

    socket.broadcast.emit("newMessage", {
        from : "Admin",
        text : "New User joined the chat",
        createdAt : new Date().getTime()
    });

    socket.on("createMessage", (message)=>{
        console.log("createMessage", message);
        io.emit("newMessage" , {
            from : message.from,
            text : message.text,
            createdAt : new Date().getTime()
        });
    });

    socket.on('disconnect', ()=>{
        console.log("User was disconnected");
    })
});



server.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
});