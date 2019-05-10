$(document).ready(function() {

let user = firebase.auth().currentUser;
//write into db 
function writeUserData(name, email) {
  firebase.database().ref('UserID/' + user.uid).set({
    username: name,
    email: email,
    list: null;
  });
}
    
$("#button").on('click', writeUserData());
    

});