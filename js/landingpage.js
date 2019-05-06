$(document).ready(function() {
    
let user = firebase.auth().currentUser;
    
function writeUserData(name, email) {
  firebase.database().ref('UserID/' + user.uid).set({
    username: name,
    email: email
  });
}
    
$("#button").on('click', writeUserData());
    
});