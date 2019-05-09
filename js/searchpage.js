$(document).ready(function() {
        
    $("#submit").on("click", function(e) {
        e.preventDefault();
        $("#detailsDropdown, #score, #listChoice, #detailsBox, #yes, #no, #prodName").toggle();
        $("#prodName").append(document.getElementById("textField").value);
        $.ajax({
            type: "POST",
            url: "/cornflakes",
            datatype: "jsonp",
            success: function(data) {
                $("#row1").html(data.row1);
                $("#row2").html(data.row2);
                $("#row3").html(data.row3);
                $("#row4").html(data.row4);
                $("#foodScore").html(data.score);
                console.log(data);
            }
        });
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