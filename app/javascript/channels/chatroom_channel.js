import consumer from "./consumer"

consumer.subscriptions.create("ChatroomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    $("#messages-0").append("<div class='ui success message'><div class=header'>" + data.content.sender + " : " + data.content.body + "</div> <small>" + data.content.date +  "</small></div>");
    // Called when there's incoming data on the websocket for this channel
  }
});
