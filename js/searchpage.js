$(document).ready(function() {
    
    // user = currently logged in user
    var user = firebase.auth().currentUser;
    
    /* This function when called, resets the page to its original layout. */
    function reset() {
        $("#detailsDropdown, #score, #listChoice, #detailsBox, #yes, #no, #prodName").toggle();
        $('#tryjs').show();
        $("#tryImg").show();
        $('#trysearchBarKeyWord').show();
        $('#trysearch').show();
        $('#trycamera').show();
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
                changeColor(snapshot.val());
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
    
    /* This is an event listener that is listening for a change in value for the input element of type file.
    When the event is triggered, it checks the file name and shows the correct image in the preview screen. */
    $("#fileUpload").on("input", function() {
        if (document.getElementById("fileUpload").value == "C:\\fakepath\\cornflakes.jpg") {
            document.getElementById("imagePreview").style = "background-image: url(https://images-na.ssl-images-amazon.com/images/I/91d6cIN13yL._SL1500_.jpg)"
            };
        if (document.getElementById("fileUpload").value == "C:\\fakepath\\luckycharms.jpg") {
            document.getElementById("imagePreview").style = "background-image: url(https://cdn.influenster.com/media/product/image/Lucky_Charms_Original_Gluten-Free_Stuff.jpg.750x750_q85ss0_progressive.jpg)"
            };
        if (document.getElementById("fileUpload").value == "C:\\fakepath\\crispyrice.jpg") {
            document.getElementById("imagePreview").style = "background-image: url(https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_1b0d02a3-d5f5-42b7-acd3-ff71ab7fd3a2.JPG)"
            };
        if (document.getElementById("fileUpload").value == "C:\\fakepath\\honeycomb.jpg") {
            document.getElementById("imagePreview").style = "background-image: url(https://images-na.ssl-images-amazon.com/images/I/91Kxbx7ei9L._SY550_.jpg)"
            };
        if (document.getElementById("fileUpload").value == "C:\\fakepath\\harvestcrunch.jpg") {
            document.getElementById("imagePreview").style = "background-image: url(https://i5.walmartimages.ca/images/Large/969/535/6000198969535.jpg)"
            };
    });
    
    
    /* When the search button is clicked on the image upload UI, this function will check the "fakepath" of the 
    currently selected file and make sure it is one of our supported products. Then it uses the getDetailsData() function
    to get the correct information from the database and dispays it on the page. */
    
    $("#imageSearchButton").on("click", function() {
        
        // File = the "fakepath" of the file currently in the input element.
        var file = document.getElementById("fileUpload").value
        
        if (file != "") {
        $("#detailsDropdown, #score, #listChoice, #detailsBox, #yes, #no, #prodName, #tryImg").toggle();
        $("#uploadimg").hide();
        $("#logo").show();
        };
        
        if (file == "C:\\fakepath\\cornflakes.jpg") {
            getDetailsData("Cornflakes");
            $("#prodName").html("Cornflakes");
        }
        
        if (file == "C:\\fakepath\\crispyrice.jpg") {
            getDetailsData("Crispy Rice");
            $("#prodName").html("Crispy Rice");
        }
        
        if (file == "C:\\fakepath\\harvestcrunch.jpg") {
            getDetailsData("Harvest Crunch");
            $("#prodName").html("Harvest Crunch");
        }
        
        if (file == "C:\\fakepath\\honeycomb.jpg") {
            getDetailsData("HoneyComb");
            $("#prodName").html("HoneyComb");
        }
        
        if (file == "C:\\fakepath\\luckycharms.jpg") {
            getDetailsData("Lucky Charms");
            $("#prodName").html("Lucky Charms");
        }
         
    });
    
    /* When the camera button is clicked it will set the image preview back to the placeholder image and it also sets
    the file input field to an empty string so that the previously selected image does not stay there. */
    $("#camerabtn").on("click", function() {
        document.getElementById("imagePreview").style = "background-image: url(http://moritzdentalcare.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png)";
        document.getElementById("fileUpload").value = ""; 
    });
    
    /* This function will make the score show up in either red, orange, or green. These colors represent
    Unhealthy, average, and healthy. The goal was to make it even easier to see how healthy your food is. */
    function changeColor(score) {
        if (score == 5 || score == 6) {
            $("#score").css("color", "red");
        }
        if (score == 7) {
            $("#score").css("color", "orange");
        }
        if (score == 9 || score == 10 || score == 8) {
            $("#score").css("color", "green");
        }
    };
    
    
    
    
    
});