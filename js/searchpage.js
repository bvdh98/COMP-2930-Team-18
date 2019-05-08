$(document).ready(function() {
    
    $("#submit").on("click", function() {
        $("#detailsDropdown, #score, #listChoice, #detailsBox, #yes, #no").toggle();
        
    });
    
    $("#detailsDropdown").on("click", function(){

       $("#row1, #row2, #row3, #row4").toggle(500);
        
    });
    
});