const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server);

app.get(`/`, (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const users = {};
//connecting a user
io.on("connection", (socket) => {
  console.log(`A new user connected with ${socket.id}`);

  socket.on("user:info", (mesg) => (users[mesg.name] = mesg));

  console.log("User Details", users);

  socket.emit("message", "user we got is " + JSON.stringify(users));

  socket.on("update:info", (arg1, res) => {
    console.log(arg1), res("update done");
  });
  socket.on("check:error:timeout", (arg1, res) => {
    console.log(arg1);
    // res("Mesg Recieved");
  });
});

// console.log('Checking', io)
const port = 3000;
server.listen(port, () => console.log(`App listening on port ${port}`));
