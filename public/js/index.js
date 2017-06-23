let socket = io();

const locateButton = $("#send-location");

socket.on("connect", function() {
  console.log("Connected");
});
socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
  const time = moment(message.createdAt).format("h:mm a");
  const template = $("#message-template").html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    time: time
  });

  $("#messages").append(html);
});

socket.on("newLocationMessage", function(message) {
  const time = moment(message.createdAt).format("h:mm a");
  const template = $('#location-message-template').html();
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    time: time
  })
  $('#messages').append(html)
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
  locateButton.attr("disabled", "disabled").text("Sending Location...");
  navigator.geolocation.getCurrentPosition(
    function(position) {
      locateButton.removeAttr("disabled").text("Send Location");
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      locateButton.removeAttr("disabled").text("Send Location");
      alert("Unable to fetch location");
    }
  );
});
