const path = require("path");
const http = require("http");
const express = require("express");

const socketIO = require("socket.io");

const publicRoute = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isReal } = require("./utils/valid");
const Users = require("./utils/users.js");
const users = new Users();

app.use(express.static(publicRoute));

io.on("connection", socket => {
  console.log("New connection");

  socket.on("join", (params, cb) => {
    if (!isReal(params.name || !isReal(params.room))) {
      return cb("Name and Room name required");
    }
    params.room = params.room.toLowerCase()
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit("updateUserList", users.getUserList(params.room));
    socket.emit(
      "newMessage",
      generateMessage("Admin", "Welcome to the chat app")
    );
    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        generateMessage("Admin", `${params.name} has joined brah`)
      );
    cb();
  });
  socket.on("createMessage", (message, cb) => {
    const user = users.getUser(socket.id);
    if (user && isReal(message.text)) {
      io
        .to(user.room)
        .emit("newMessage", generateMessage(user.name, message.text));
    }
    cb();
  });
  socket.on("createLocationMessage", coords => {
    const user = users.getUser(socket.id);
    if (user) {
      io.emit(
        "newLocationMessage",
        generateLocationMessage(user.name, coords.latitude, coords.longitude)
      );
    }
  });
  socket.on("disconnect", () => {
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io
        .to(user.room)
        .emit(
          "newMessage",
          generateMessage("Admin", `${user.name} has left brah`)
        );
    }
  });
});

if (port === 3000) {
  const reload = require("reload");
  reload(server, app);
}

server.listen(port, () => {
  console.log("Up on " + port);
});
