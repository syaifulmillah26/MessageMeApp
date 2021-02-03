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
          if (data.content.user_id == $(".user_id").val()){
            $("#messages-" + data.content.room_id).append(
              "<div class='incoming_msg feed' id='message'>" +
                "<div class='incoming_msg_img'>" +
                  "<img alt='sunil' src='https://ptetutorials.com/images/user-profile.png'/></div>" +
                "<div class='received_msg'>" +
                  "<div class='received_withd_msg'>" +
                    "<p>" + data.content.body + "</p>" +
                    "<span class='time_date'>" + data.content.date + "   |   " + jQuery.timeago(data.content.created_at) + "</span>" +
                  "</div>" +
                "</div>" +
              "</div>")
          } else {
            $("#messages-" + data.content.room_id).append(
              "<div class='outgoing_msg feed' id='message'>" +
                "<div class='sent_msg'>" +
                  "<p>" + data.content.body + "</p>" +
                  "<span class='time_date'>" + data.content.date + "   |   " + jQuery.timeago(data.content.created_at) + "</span>" +
                "</div>" +
              "</div>")
          }
          var elem = document.getElementById('messageContent');
          elem.scrollTop = elem.scrollHeight;
        }
      });
    },
  });
 }

