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
const myfunc = (mesg) => console.log("Hello on and off guys working" + mesg);
//connecting a user
io.on("connection", (socket) => {
  console.log(`A new user connected with ${socket.id}`);

  socket.on("joinGameRoom", () => {
    socket.join("gameRoom");
  });
  socket.on("joinNetworkRoom", () => {
    socket.join("networkRoom");
  });
  socket.on("joinGraphicsRoom", () => {
    socket.join("graphicsRoom");
  });
  socket.on("joinDesignRoom", () => {
    socket.join("designRoom");
  });
  socket.on("joinWebDevRoom", () => {
    socket.join("webDevRoom");
  });
  socket.on("joinOtherRoom", () => {
    socket.join("otherRoom");
  });

  // socket.on("on:event", myfunc);

  // socket.on("off:event", () => {
  //   socket.off("on:event", myfunc);
  // });

  // socket.onAny((event, ...args) => {
  //   console.log("Events ", event, " Args ", args);
  // });

  // socket.on("user:info", (mesg) => (users[mesg.name] = mesg));

  // console.log("User Details", users);

  // socket.emit("message", "user we got is " + JSON.stringify(users));

  // socket.on("update:info", (arg1, res) => {
  //   console.log(arg1), res("update done");
  // });
  // socket.on("check:error:timeout", (arg1, res) => {
  //   console.log(arg1);
  //   res("Mesg Recieved");
  // });
  // io.emit("broadcast", "Hello guys");
  // // socket.on("ping", (mesg) => console.log(mesg));
  // socket.on("my:mood", (name, mood) => {
  //   io.emit("res:mood", name, mood);
  // });
});

// console.log('Checking', io)
const port = 3000;
server.listen(port, () => console.log(`App listening on port ${port}`));
