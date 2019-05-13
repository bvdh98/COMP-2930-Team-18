$(document).ready(function() {
    
    var user = firebase.auth().currentUser;
    
    function reset() {
        $("#detailsDropdown, #score, #listChoice, #detailsBox, #yes, #no, #prodName").toggle();
        $('#tryjs').show();
    };
    
    function addToUserList() {
        let product = document.getElementById("prodName").innerText;
        let value = document.getElementById("foodScore").innerText;
        
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                firebase.database().ref("users/" + user.uid + "/list").update({
                    [product]: value
                });
            } else {
                console.log("Roy is noob");
            }
        });
    };
    
    $("#no").on("click", function(){
        reset();
    });
    
    $("#yes").on("click", function(){
        addToUserList();
        reset();
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
    
    $('#submit').on('click', function () {
        if(document.getElementById("textField").value != "") {
         $('#tryjs').hide();
        };
     });
    
    $("#submit").on("click", function() {
        
        if (document.getElementById("textField").value != "") {
        $("#detailsDropdown, #score, #listChoice, #detailsBox, #yes, #no, #prodName").toggle();
        };
        
        let search = document.getElementById("textField").value;
        
        if (search == "Cornflakes" || search == "cornflakes" || search == "Corn flakes" || search == "corn flakes"
           || search == "Corn Flakes") {
            getDetailsData("Cornflakes");
            $("#prodName").html("Cornflakes");
        };
        
        if (search == "Crispy Rice" || search == "crispy rice" || search == "CrispyRice" || search == "crispyrice"
           || search == "Crispy rice" || search == "crispy Rice") {
            getDetailsData("Crispy Rice");
            $("#prodName").html("Crispy Rice");
        };
        
        if (search == "Harvest Crunch" || search == "harvest crunch" || search == "HarvestCrunch" || search == "harvestcrunch"
           || search == "Harvest crunch") {
            getDetailsData("Harvest Crunch");
            $("#prodName").html("Harvest Crunch");
        };
        
        if (search == "HoneyComb" || search == "honeycomb" || search == "Honey Comb" || search == "honey comb"
           || search == "Honeycomb" || search == "Honey comb") {
            getDetailsData("HoneyComb");
            $("#prodName").html("HoneyComb");
        };
        
        if (search == "Lucky Charms" || search == "lucky charms" || search == "LuckyCharms" || search == "luckycharms"
           || search == "Luckycharms" || search == "Lucky charms") {
            getDetailsData("Lucky Charms");
            $("#prodName").html("Lucky Charms");
        };
        
    });
    
    $("#detailsDropdown").on("click", function(){
       $("#row1, #row2, #row3, #row4").toggle(500);
    });
    
    $(document).ready(function() {
            $('#eggs').on('click', function() {
                $('body').css("animation", "spin-left 10s linear");
            });
        });
    
    (function() {
            firebase.auth().onAuthStateChanged(function(user) {
                firebase.database().ref("users/" + user.uid).update({
                    "name": user.displayName,
                    "email": user.email,
                }); 
            });
        })()
    
});