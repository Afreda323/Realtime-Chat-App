const path = require("path");
const http = require("http");
const express = require("express");
const reload = require("reload");
const socketIO = require("socket.io");

const public = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(public));

io.on("connection", socket => {
  console.log("New connection");
  socket.emit('newMessage', {
      from: 'Jimmy',
      text: 'Ayy lamo',
      createdAt: new Date().getTime()
  })
  socket.on('createMessage', (message) => {
      console.log('New message');
      console.log('From: ', message.from);
      console.log('Text: ', message.text);
      console.log('At: ', new Date().getTime())
  })
  socket.on("disconnect", () => {
    console.log("New Disconnect");
  });
});

reload(server, app);

server.listen(port, () => {
  console.log("Up on " + port);
});
