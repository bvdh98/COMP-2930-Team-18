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
        $("#logo").show();
        $("#searchResultsImg").hide();
        $("#logo").css("position", "relative");
        $("#logo").css("left", "");
        $("#logoContainer").css("top", "-5%");
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
        window.alert("Product successfully added to your list!");
    });
    
    /* This is the function used to get the information from the database. It accepts a
    parameter which is the name of the product in the database. It goes through all the details for the
    specified product in the database and puts the information inside the details dropdown box. */
    function getDetailsData(name) {
        showImage(name);
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
    
    /* This function checks the search text field for any of the possible allowed inputs, and then calls
    the getDetailsData() function with the correct name. This way our search bar allows multiple different spellings
    of each of the products in our database. Each if statement is just checking if the value of the text field is any of
    the possible spellings. */
    $("#submit").on("click", function() {
        
        let search = document.getElementById("textField").value;
        
        /* This are all the words that our search will accept, anything other than one of these words and you will get a window alert telling you that the
        product was not found. */
        let allowedWords = ["Cornflakes", "cornflakes", "Corn flakes", "corn flakes", "Corn Flakes", "Crispy Rice", "crispy rice", "CrispyRice", "crispyrice",
                           "Crispy rice", "crispy Rice", "Harvest Crunch", "harvest crunch", "HarvestCrunch", "harvestcrunch", "Harvest crunch",
                           "HoneyComb", "honeycomb", "Honey Comb", "honey comb", "Honeycomb", "Honey comb", "Lucky Charms", "lucky charms",
                           "LuckyCharms", "luckycharms", "Luckycharms", "Lucky charms"];
        let arrayChecker = 0;
        allowedWords.forEach(function(thisWord) {
           if (search == thisWord) {
               arrayChecker = 1;
               }
        });
        if (arrayChecker != 0) {
            $("#detailsDropdown, #score, #listChoice, #detailsBox, #yes, #no, #prodName").toggle();
            $('#tryjs').hide();
            $("#searchResultsImg").show();
            $("#logoContainer").css("top", "-60%");
            $("#logo").css("position", "absolute");
            $("#logo").css("left", "25%");
        } else {
            window.alert("Sorry, that item could not be found :(");
        }
        
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
    
    /* This will send a verification email to the current user, if they are not already verified. */
    firebase.auth().onAuthStateChanged(function (firebaseUser) {
        if (user.emailVerified == null) {
          firebaseUser.sendEmailVerification().then(function() {
            // Email sent.
          }, function(error) {
            // An error happened.
          });
        };
    });
    
    /* This is an event listener that is listening for a change in value for the input element of type file.
    When the event is triggered, it checks the file name and shows the correct image in the preview screen. */
    $("#fileUpload").on("input", function() {
        if (document.getElementById("fileUpload").value == "C:\\fakepath\\cornflakes.jpg") {
            document.getElementById("imagePreview").style = "background-image: url(https://images-na.ssl-images-amazon.com/images/I/91d6cIN13yL._SL1500_.jpg)"
            };
        if (document.getElementById("fileUpload").value == "C:\\fakepath\\luckycharms.jpg") {
            document.getElementById("imagePreview").style = "background-image: url(https://cdn.influenster.com/media/product/image/Lucky_Charms_Original_Gluten-Free_Stuff.jpg.750x750_q85ss0_progressive.jpg)"
            };
        if (document.getElementById("fileUpload").value == "C:\\fakepath\\crispyrice.png") {
            document.getElementById("imagePreview").style = "background-image: url(https://www.nassaugrocery.com/wp-content/uploads/2016/11/Kellogg%E2%80%99s-Rice-Krispies-Cereal.png)"
            };
        if (document.getElementById("fileUpload").value == "C:\\fakepath\\honeycomb.jpg") {
            document.getElementById("imagePreview").style = "background-image: url(https://images-na.ssl-images-amazon.com/images/I/91Kxbx7ei9L._SY550_.jpg)"
            };
        if (document.getElementById("fileUpload").value == "C:\\fakepath\\harvestcrunch.png") {
            document.getElementById("imagePreview").style = "background-image: url(https://www.quakeroats.ca/sites/quakeroats.ca/files/M221705_HC_Orgnl_560g_Eng.png)"
            };
    });
    
    
    /* When the search button is clicked on the image upload UI, this function will check the "fakepath" of the 
    currently selected file and make sure it is one of our supported products. Then it uses the getDetailsData() function
    to get the correct information from the database and dispays it on the page. */
     $("button[title='Upload selected files']").on("click",function(){
         console.log("13323");
     });

    $("#resetbtn").on("click",function(){
        $("#imagePreview").css("background-image","none");
     });
    
    
    $("#imageSearchButton").on("click", function() {
        
        // File = the "fakepath" of the file currently in the input element.
        var file = document.getElementById("fileUpload").value
        if (file != "") {
        $("#detailsDropdown, #score, #listChoice, #detailsBox, #yes, #no, #prodName, #tryImg").toggle();
        $("#uploadimg").hide();
        $("#logo").show();
        $("#logoContainer").css("top", "-60%");
        $("#logo").css("position", "absolute");
        $("#logo").css("left", "25%");
        };
        if (file == "C:\\fakepath\\cornflakes.jpg") {
            getDetailsData("Cornflakes");
            $("#prodName").html("Cornflakes");
        }
        if (file == "C:\\fakepath\\crispyrice.png") {
            getDetailsData("Crispy Rice");
            $("#prodName").html("Crispy Rice");
        }
        if (file == "C:\\fakepath\\harvestcrunch.png") {
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
//        document.getElementById("imagePreview").style = "background-image: url(http://moritzdentalcare.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png)";
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
    
    /* This is a helper function used inside of the getDetailsData() function that checks the name of the product being searched and
    changes the background image of a div to the correct image on the search results page. */
    function showImage(name) {
        if (name == "Cornflakes") {
            document.getElementById("searchResultsImg").style = "background-image: url(https://images-na.ssl-images-amazon.com/images/I/91d6cIN13yL._SL1500_.jpg)"
        }
        if (name == "Lucky Charms") {
            document.getElementById("searchResultsImg").style = "background-image: url(https://cdn.influenster.com/media/product/image/Lucky_Charms_Original_Gluten-Free_Stuff.jpg.750x750_q85ss0_progressive.jpg)"
        }
        if (name == "Crispy Rice") {
            document.getElementById("searchResultsImg").style = "background-image: url(https://www.nassaugrocery.com/wp-content/uploads/2016/11/Kellogg%E2%80%99s-Rice-Krispies-Cereal.png)"
        }
        if (name == "HoneyComb") {
            document.getElementById("searchResultsImg").style = "background-image: url(https://images-na.ssl-images-amazon.com/images/I/91Kxbx7ei9L._SY550_.jpg)"
        }
        if (name == "Harvest Crunch") {
            document.getElementById("searchResultsImg").style = "background-image: url(https://www.quakeroats.ca/sites/quakeroats.ca/files/M221705_HC_Orgnl_560g_Eng.png)"
        }
    };
    
    
    
});