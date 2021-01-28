 window.myFunction = function(this_id) {
  // remove list items if exists
  var del = document.getElementById("message");
  if (del != null) {
    $(".message").each(function (i, obj) {
      obj.remove();
    });
  }

  // get data user
  const user_id = this_id;
  $.ajax({
    type: "GET",
    url: "/messages/get_user.json",
    data: {
      user_id: user_id,
    },
    success: function (data) {
      $(".header-name").text("Chat with " + data.name);
      $(".user_id").val(data.user_id);
      $("#hide_textarea").show();
      $("#hide_button").show();
      if (data.room_id != null) {
        $(".room_id").val(data.room_id);
      }
      if (data.rooms) {
        const options = {weekday: 'short', month: 'short', day: 'numeric' };
        data.rooms.forEach(function (wizard) {
          $("#messages-0").append(
            "<div class='ui success message' id='message'><div class=header'>" + wizard.sender + " : " + wizard.body + "</div> <small>" + wizard.date +  "</small></div>");
          });
        }
      },
    });
  }

  window.submit = function () {
    const user = $(".user_id").val();
    const room = $(".room_id").val();
    const message = $(".body").val();

    $.ajax({
      type: "POST",
      url: "/messages/create_message.json",
      data: {
        message: {
          user_id: user,
          room_id: room,
          body: message,
        },
      },
      success: function (data) {
        toastr.success("Send");
        $("#hide_textarea").val("");
      },
    });
  }