$(document).ready(function () {
    //            $('#logo').on('click', function() {
    //
    //                $('#submit').addClass('displayNone');
    //                $('#trysearchBarKeyWord').hide();
    //
    //
    //            });
    $('#trycamera').on('click', function () {

        $('.uploadimg').show();
        $('#trysearchBarKeyWord').hide();
        $('#trysearch').hide();
        $('#tryImg').addClass("forImageUpload");
        $('#trycamera').hide();


        $('.uploadimg').prepend("<button id='iambtn' > Back </button>");


    });



});