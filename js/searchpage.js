$(document).ready(function() {
    
    var user = firebase.auth().currentUser;
    
    function reset() {
        $("#detailsDropdown, #score, #listChoice, #detailsBox, #yes, #no, #prodName").toggle();
        $('#tryjs').show();
    };
    
    function addToUserList() {
        
        let scoreToAdd = document.getElementById("foodScore").value;
        
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.database().ref("users/" + user.uid + "/list").push(document.getElementById("foodScore").innerText);
        } else {
            console.log("spencer sucks LOL");
        }
    });
    };
    
    $("#no").on("click", function(){
        reset();
    });
    
    $("#yes").on("click", function(){
        addToUserList();
    });
    
    function getDetailsData(name) {
        dbRef.ref("Products/" + name + "/1").on('value', function(snapshot) {
                $("#row1").html(snapshot.val());
            });
            dbRef.ref("Products/" + name + "/2").on('value', function(snapshot) {
                $("#row2").html(snapshot.val());
            });
            dbRef.ref("Products/" + name + "/3").on('value', function(snapshot) {
                $("#row3").html(snapshot.val());
            });
            dbRef.ref("Products/" + name + "/4").on('value', function(snapshot) {
                $("#row4").html(snapshot.val());
            });
            dbRef.ref("Products/" + name + "/score").on('value', function(snapshot) {
                $("#foodScore").html(snapshot.val());
            });
    };
    
    let dbRef = firebase.database();
        
    $("#submit").on("click", function() {
        
        $("#detailsDropdown, #score, #listChoice, #detailsBox, #yes, #no, #prodName").toggle();
        $("#prodName").html(document.getElementById("textField").value);
        
        let search = document.getElementById("textField").value;
        
        if (search == "Cornflakes") {
            getDetailsData(search);
        };
        
        if (search == "Crispy Rice") {
            getDetailsData(search);
        };
        
        if (search == "Harvest Crunch") {
            getDetailsData(search);
        };
        
        if (search == "HoneyComb") {
            getDetailsData(search);
        };
        
        if (search == "Lucky Charms") {
            getDetailsData(search);
        };
        
        
//        $.ajax({
//            type: "POST",
//            url: "/cornflakes",
//            datatype: "jsonp",
//            success: function(data) {
//                $("#row1").html(data.row1);
//                $("#row2").html(data.row2);
//                $("#row3").html(data.row3);
//                $("#row4").html(data.row4);
//                $("#foodScore").html(data.score);
//                console.log(data);
//            }
//        });
//        $.ajax({
//            type: "GET",
//            url: "/search",
//            datatype: "jsonp",
//        }).done(function(data) {
//                $("#row1").html(data.row1);
//                $("#row2").html(data.row2);
//                $("#row3").html(data.row3);
//                $("#row4").html(data.row4);
//                $("#foodScore").html(data.score);
//                console.log(data);
//            });
        
//        if (search == "Crispy Rice"){
//        $.ajax({
//            type: "GET",
//            url: "/crispyrice"
//        }).done(function(data) {
//                $("#row1").append(data.row1);
//                $("#row2").append(data.row2);
//                $("#row3").append(data.row3);
//                $("#row4").append(data.row4);
//                $("#foodScore").append(data.score);
//                console.log(data);
//            });
//        };
        
    });
    
    $("#detailsDropdown").on("click", function(){
       $("#row1, #row2, #row3, #row4").toggle(500);
    });
    
});