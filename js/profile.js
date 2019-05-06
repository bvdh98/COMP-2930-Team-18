$(document).ready(function() {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    let name = document.getElementById("userid");
    name.append(user.displayName);
  } else {
    console.log("spencer sucks LOL");
  }

var query = firebase.database().ref("UserID/" + user.uid).orderByKey();
let number = 0;
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                number += childSnapshot.val();
            });
    let average = number / 4;
    document.getElementById("calcAverage").append(average);
        });
    });
});