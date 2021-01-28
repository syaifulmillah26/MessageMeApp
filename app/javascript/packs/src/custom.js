// hide text area
$("#hide_textarea").hide();
$("#hide_button").hide(); 


// get user data on messages
window.myFunction = function(this_id) {
 // remove list items if exists
 var del = document.getElementById("message");
 if (del != null) {
   $(".message").each(function (i, obj) {
     obj.remove();
   });
 }

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

 // create message
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

 window.getAutocomplete = function (){
   // searching user form autocomplete
   $.ajax({
     type: "GET",
     url: "/users/search_user.json",
     success: function (data) {
       // console.log(data)
       /*An array containing all the country names in the world:*/
       var countries = data.data
       /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
       autocomplete(document.getElementById("myInput"), countries);

     },
   });
 }

 

 // perform autocomplete
 function autocomplete(inp, arr) {
   /*the autocomplete function takes two arguments,
   the text field element and an array of possible autocompleted values:*/
   var currentFocus;
   /*execute a function when someone writes in the text field:*/
   inp.addEventListener("input", function(e) {
     var a, b, i, val = this.value;
     /*close any already open lists of autocompleted values*/
     closeAllLists();
     if (!val) { return false;}
     currentFocus = -1;
     /*create a DIV element that will contain the items (values):*/
     a = document.createElement("DIV");
     a.setAttribute("id", this.id + "autocomplete-list");
     a.setAttribute("class", "autocomplete-items");
     /*append the DIV element as a child of the autocomplete container:*/
     this.parentNode.appendChild(a);
     /*for each item in the array...*/
     for (i = 0; i < arr.length; i++) {
       /*check if the item starts with the same letters as the text field value:*/
       if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
         /*create a DIV element for each matching element:*/
         b = document.createElement("DIV");
         /*make the matching letters bold:*/
         b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
         b.innerHTML += arr[i].substr(val.length);
         /*insert a input field that will hold the current array item's value:*/
         b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
         /*execute a function when someone clicks on the item value (DIV element):*/
         b.addEventListener("click", function(e) {
             /*insert the value for the autocomplete text field:*/
             inp.value = this.getElementsByTagName("input")[0].value;
             /*close the list of autocompleted values,
             (or any other open lists of autocompleted values:*/
             closeAllLists();
         });
         a.appendChild(b);
       }
     }
   });
   /*execute a function presses a key on the keyboard:*/
   inp.addEventListener("keydown", function(e) {
     var x = document.getElementById(this.id + "autocomplete-list");
     if (x) x = x.getElementsByTagName("div");
     if (e.keyCode == 40) {
       /*If the arrow DOWN key is pressed,
       increase the currentFocus variable:*/
       currentFocus++;
       /*and and make the current item more visible:*/
       addActive(x);
     } else if (e.keyCode == 38) { //up
       /*If the arrow UP key is pressed,
       decrease the currentFocus variable:*/
       currentFocus--;
       /*and and make the current item more visible:*/
       addActive(x);
     } else if (e.keyCode == 13) {
       /*If the ENTER key is pressed, prevent the form from being submitted,*/
       e.preventDefault();
       if (currentFocus > -1) {
         /*and simulate a click on the "active" item:*/
         if (x) x[currentFocus].click();
       }
     }
   });
   function addActive(x) {
     /*a function to classify an item as "active":*/
     if (!x) return false;
     /*start by removing the "active" class on all items:*/
     removeActive(x);
     if (currentFocus >= x.length) currentFocus = 0;
     if (currentFocus < 0) currentFocus = (x.length - 1);
     /*add class "autocomplete-active":*/
     x[currentFocus].classList.add("autocomplete-active");
   }
   function removeActive(x) {
     /*a function to remove the "active" class from all autocomplete items:*/
     for (var i = 0; i < x.length; i++) {
       x[i].classList.remove("autocomplete-active");
     }
   }
   function closeAllLists(elmnt) {
     /*close all autocomplete lists in the document,
     except the one passed as an argument:*/
     var x = document.getElementsByClassName("autocomplete-items");
     for (var i = 0; i < x.length; i++) {
       if (elmnt != x[i] && elmnt != inp) {
         x[i].parentNode.removeChild(x[i]);
       }
     }
   }
   /*execute a function when someone clicks in the document:*/
   document.addEventListener("click", function (e) {
       closeAllLists(e.target);
   });
 }