import consumer from "./consumer"

window.goTo = function(this_id) {
  consumer.subscriptions.subscriptions.forEach((subscription) => {
    consumer.subscriptions.remove(subscription)  
  })

  $.ajax({
    type: "GET",
    url: "/messages/get_user.json",
    data: {
      user_id: this_id,
    },
    success: function (data) {
      consumer.subscriptions.create({ channel: "ChatroomChannel", room_id: data.room_id}, {
        connected() {
          // Called when the subscription is ready for use on the server
          console.log("connected to...." + data.room_id)
        },
      
        disconnected() {
          // Called when the subscription has been terminated by the server
        },
      
        received(data) {
          $(".noMessage").remove();
          $(".messages-0").attr("id", "messages-" + data.content.room_id)
          $("#messages-" + data.content.room_id).append("<div class='ui large feed'><div class='event'><div class='label'><img src='https://semantic-ui.com/images/avatar/small/elliot.jpg'></div><div class='content'><div class='summary'>" 
            + data.content.sender + 
            "<div class='date'>" 
            + jQuery.timeago(data.content.created_at) + 
            "</div></div><div class='extra text'>" 
            + data.content.body + 
            "</div></div></div></div>");
        }
      });
    },
  });
 }

