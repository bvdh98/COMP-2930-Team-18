$(document).ready(function() {
    
    $("#submit").on("click", function() {
        $("#detailsDropdown, #score, #listChoice, #detailsBox, #yes, #no, #prodName").toggle();
        let search = document.getElementById("textField").value;
        $("#prodName").append(search);
        
        $.ajax({
            type: "GET",
            url: "/ajaxcall"
        }).done(function(data) {
                $("#row1").append(data);
                console.log(data);
            });
        
    });
    
    $("#detailsDropdown").on("click", function(){
       $("#row1, #row2, #row3, #row4").toggle(500);
    });
    
});