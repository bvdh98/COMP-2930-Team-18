//Document loaded
$(document).ready(function () {
    console.log("im ready");
//Uploading the File
    function sendFile(fileData) {
        var formData = new FormData();

        formData.append('imageData', fileData);

        $.ajax({
            type: 'POST',
            url: '/your/upload/url',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.success) {
                    alert('Your file was successfully uploaded!');
                } else {
                    alert('There was an error uploading your file!');
                }
            },
            error: function (data) {
                alert('There was an error uploading your file!');
            }
        });
    }

});
