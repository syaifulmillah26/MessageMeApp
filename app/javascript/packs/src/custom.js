function myFunction(this_id) {
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
        data.rooms.forEach(function (wizard) {
          // Create an unordered list
          var list = document.createElement("li");
          list.className = "ui small message";
          list.id = "message";
          // Create a fragement
          var fragment = document.createDocumentFragment();
          var li = document.createElement("span");

          li.textContent = wizard.sender + " : " + wizard.body;
          // and append it to the fragment
          fragment.appendChild(li);
          var app = document.querySelector("#messages-0");
          list.appendChild(fragment);
          app.appendChild(list);
        });
      }
    },
  });
}

function submit() {
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
      // var list = document.createElement("li");
      // list.className = "ui small message";
      // list.id = "message";
      // // Create a fragement
      // var fragment = document.createDocumentFragment();
      // var li = document.createElement("span");

      // li.textContent = data.sender + " : " + data.body;
      // // and append it to the fragment
      // fragment.appendChild(li);
      // var app = document.querySelector("#messages-0");
      // list.appendChild(fragment);
      // app.appendChild(list);
      // toastr.success("Saved!");
      // $("#hide_textarea").val("");
    },
  });
}

$(document).ready(function () {
  $("#hide_textarea").hide();
  $("#hide_button").hide();
});
