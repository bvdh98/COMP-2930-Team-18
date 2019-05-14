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


        $('.uploadimg').prepend("<button id='iambtn' class='btn btn-lg btn-success '> Back </button>");

        $("#imageUpload").fileinput({

            previewFileType: "image",
            browseClass: "btn btn-success",
            browseLabel: "Pick Image",
            browseIcon: "<i class=\"glyphicon glyphicon-picture\"></i> ",
            removeClass: "btn btn-danger",
            removeLabel: "Delete",
            removeIcon: "<i class=\"glyphicon glyphicon-trash\"></i> ",
            uploadClass: "btn btn-info",
            uploadLabel: "Upload",
            uploadIcon: "<i class=\"glyphicon glyphicon-upload\"></i> ",
            
        });

    });



});
