$(document).ready(function() {

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    let name = document.getElementById("userid");
    name.append(user.displayName);
  } else {
    console.log("spencer sucks LOL");
  }
    
/* Reference to firebase database. */
var query = firebase.database().ref("users/" + user.uid + "/list").orderByKey();
    
/* number = sum of scores */
let number = 0;
    
/* count is used to keep track of the amount of items on the list */
let count = 0;

/* This function iterates through the list of the current user and calculates the sum of the scores, and
adds the names and scores of the products to their list on the screen so the user can see whats on their list. */
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                number += parseFloat(childSnapshot.val());
                count++;
                $("#userlist").append("<li>" + key + ": " + childSnapshot.val() + "</li>");
            });
    // calculating the average.
    let average = number / count;
    $("#calcAverage").html(average.toFixed(2));
        });
    });
    
    /* This says when the user clicks on the List drop down menu, the users list will appear. */
    $("#userlist").on("click", function() {
        $("#userlist li").toggle(500);
    });
    
});