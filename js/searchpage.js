$(document).ready(function() {
    
    // user = currently logged in user
    var user = firebase.auth().currentUser;
    
    /* This function when called, resets the page to its original layout. */
    function reset() {
        $("#detailsDropdown, #score, #listChoice, #detailsBox, #yes, #no, #prodName").toggle();
        $('#tryjs').show();
    };
    
    /* This is the function that is used to add the current product that is displayed on the page to the current 
    users personal "foodlist" in the database. The name of the product is used as the key and the value is just the score.
    */
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
    
    /* When the user clicks on the no button only the reset function is called. */
    $("#no").on("click", function(){
        reset();
    });
    
    /* When the user clicks on the yes button these two functions are called. */
    $("#yes").on("click", function(){
        addToUserList();
        reset();
    });
    
    /* This is the function used to get the information from the database. It accepts a
    parameter which is the name of the product in the database. It goes through all the details for the
    specified product in the database and puts the information inside the details dropdown box. */
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
    
    // database reference
    let dbRef = firebase.database();
    
    /* This function says that if the textfield is empty then do nothing, else hide the search bar and do the search. */
    $('#submit').on('click', function () {
        if(document.getElementById("textField").value != "") {
         $('#tryjs').hide();
        };
     });
    
    
    /* This function checks the search text field for any of the possible allowed inputs, and then calls
    the getDetailsData() function with the correct name. This way our search bar allows multiple different spellings
    of each of the products in our database. Each if statement is just checking if the value of the text field is any of
    the possible spellings. */
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
    
    // this drops down the details information when the details dropdown div is clicked. 
    $("#detailsDropdown").on("click", function(){
       $("#row1, #row2, #row3, #row4").toggle(500);
    });
    
    // Easter Egg function, spins the page when the button in the top right corner of the page is clicked.
    $(document).ready(function() {
            $('#eggs').on('click', function() {
                $('body').css("animation", "spin-left 10s linear");
            });
        });
    
    /* This function runs everytime the search page opens and it does nothing if the current user 
    is already in the database, and if the user is not in the database, it adds them. */
    (function() {
            firebase.auth().onAuthStateChanged(function(user) {
                firebase.database().ref("users/" + user.uid).update({
                    "name": user.displayName,
                    "email": user.email,
                }); 
            });
        })()
    
});