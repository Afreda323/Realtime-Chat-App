(function() {
  let socket = io();
  socket.on("connect", function() {
    console.log("Connected");
    socket.emit("createMessage", {
      from: "Sloo",
      text: "fuk off mate"
    });
  });
  socket.on("disconnect", function() {
    console.log("Disconnected from server");
  });
  socket.on("newMessage", function(message) {
    console.log("From: ", message.from);
    console.log("Text: ", message.text);
  });
})();
