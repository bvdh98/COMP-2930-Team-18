//Document loaded
$(document).ready(function () {
    console.log("im ready");
    //Uploading the File
    
    
    
    function sendFile(fileData) {
        var formData = new FormData();

        formData.append('imageData', fileData);

        $.ajax({
            type: 'GET',
            url: 'https://comp2930-3639b.firebaseio.com/.json',
            data: JSON.stringify(param),
            success: function () {

                alert('Your file was successfully uploaded!');
            },
            error: function (data) {
                alert("error: " + error);
            }
        });
    }

});
