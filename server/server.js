const path = require("path");
const http = require("http");
const express = require("express");

const socketIO = require("socket.io");

const public = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { generateMessage, generateLocationMessage } = require("./utils/message");

app.use(express.static(public));

io.on("connection", socket => {
  console.log("New connection");

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app")
  );
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New person joined")
  );
  socket.on("createMessage", (message, cb) => {
    io.emit("newMessage", generateMessage(message.from, message.text));
    cb("Success!");
  });
  socket.on("createLocationMessage", coords => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("LOLbrah", coords.latitude, coords.longitude)
    );
  });
  socket.on("disconnect", () => {
    console.log("New Disconnect");
  });
});

if (port === 3000) {
  const reload = require("reload");
  reload(server, app);
}

server.listen(port, () => {
  console.log("Up on " + port);
});
