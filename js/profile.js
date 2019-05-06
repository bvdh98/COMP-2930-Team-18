$(document).ready(function() {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    let name = document.getElementById("userid");
    name.append(user.displayName);
      
    /* Getting Database Reference */
      
    let dbRef = firebase.database();
    
    /* .ref specifies what key in the DB. Grabbing the value of key1 and appending to a span in the html document. */
      var average = 0;
      var sum = 0;
      var currentNum = 0;
      for (var count = 1; count < 5; count++) {
      
      dbRef.ref("UserID/" + user.uid + "/key" + count).on('value', function(snapshot){  
        currentNum = snapshot.val();  
      });
          sum += currentNum;
      }
      
      //average = sum / 4;
      
      document.getElementById("calcAverage").append(sum);
      
  } else {
    console.log("spencer sucks LOL");
  }
});
    
});