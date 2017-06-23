const path = require("path");
const http = require("http");
const express = require("express");

const socketIO = require("socket.io");

const public = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(public));

io.on("connection", socket => {
  console.log("New connection");
  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the chat app",
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New person joined",
    createdAt: new Date().getTime()
  });
  socket.on("createMessage", message => {
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });
  socket.on("disconnect", () => {
    console.log("New Disconnect");
  });
});

//Live reload on local
if (port === 3000) {
  const reload = require("reload");
  reload(server, app);
}

server.listen(port, () => {
  console.log("Up on " + port);
});
