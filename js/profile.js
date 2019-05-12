$(document).ready(function() {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    let name = document.getElementById("userid");
    name.append(user.displayName);
  } else {
    console.log("spencer sucks LOL");
  }

var query = firebase.database().ref("users/" + user.uid + "/list").orderByKey();
let number = 0;
let count = 0;
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                number += parseFloat(childSnapshot.val());
                count++;
                $("#userlist").append("<li>" + key + ": " + childSnapshot.val() + "</li>");
            });
    let average = number / count;
    $("#calcAverage").html(average.toFixed(2));
        });
    });
    
    $("#userlist").on("click", function() {
        $("#userlist li").toggle(500);
    });
    
});