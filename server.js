const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server);

app.get(`/`, (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const user = {};
//connecting a user
io.on("connection", (socket) => {
  console.log(`A new user connected with ${socket.id}`);

  socket.on("name", (mesg) => (user.name = mesg));
  socket.on("job", (mesg) => (user.job = mesg));
  socket.on("city", (mesg) => (user.city = mesg));
  console.log("User Details", user);
  socket.emit("message", "user we got is " + JSON.stringify(user));
});

// console.log('Checking', io)
const port = 3000;
server.listen(port, () => console.log(`App listening on port ${port}`));
