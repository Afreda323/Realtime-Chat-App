let socket = io();
const locateButton = $("#send-location");

const scrollToBottom = function(params) {
  const messages = $("#messages");
  const newMessage = messages.children("li:last-child");
  const clientHeight = messages.prop("clientHeight");
  const scrollTop = messages.prop("scrollTop");
  const scrollHeight = messages.prop("scrollHeight");
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();
  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on("connect", function() {
  const params = $.deparam(window.location.search);
  socket.emit('join', params, function(err) {
    if(err){
      alert(err);
      window.location.href = '/'
    } else {
      console.log('NO ERROR')
    }
  })
});
socket.on("disconnect", function() {
  console.log("Disconnected from server");
});
socket.on('updateUserList', (users) => {
  console.log(users)
  const ol = $('<ol></ol>')
  users.forEach(function(user) {
    ol.append($('<li></li>').text(user))
  });
  $('#users').html(ol);
})
socket.on("newMessage", function(message) {
  const time = moment(message.createdAt).format("h:mm a");
  const template = $("#message-template").html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    time: time
  });

  $("#messages").append(html);
  scrollToBottom();
});

socket.on("newLocationMessage", function(message) {
  const time = moment(message.createdAt).format("h:mm a");
  const template = $("#location-message-template").html();
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    time: time
  });
  $("#messages").append(html);
  scrollToBottom();
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
