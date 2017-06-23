let socket = io();

const locateButton = $("#send-location");

socket.on("connect", function() {
  console.log("Connected");
});
socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
  let li = $("<li></li>");
  li.text(`${message.from}: ${message.text}`);
  $("#messages").append(li);
});

socket.on("newLocationMessage", function(message) {
  let li = $("<li></li>");
  let a = $('<a target="_blank">My Current Location</a>');
  li.text(`${message.from}: `);
  a.attr("href", message.url);
  li.append(a);
  $("#messages").append(li);
});

$("#message-form").on("submit", function(e) {
  e.preventDefault();
  const text = $("#message-text");
  socket.emit(
    "createMessage",
    {
      from: "IDK",
      text: text.val()
    },
    function() {
      console.log("success");
      text.val("");
    }
  );
});

locateButton.on("click", function(e) {
  e.preventDefault();
  
  if (!navigator.geolocation) {
    return alert("Geolocation not supported");
  }
  locateButton.attr('disabled', 'disabled').text('Sending Location...');
  navigator.geolocation.getCurrentPosition(
    function(position) {
      locateButton.removeAttr('disabled').text('Send Location');
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      locateButton.removeAttr('disabled').text('Send Location');
      alert("Unable to fetch location");
    }
  );
});
