$(document).ready(function() {
    $('#add').click(function(event) {
        event.preventDefault(); // Prevent default form submission if inside a form
        console.log('Added');
        const formData = new FormData();
        let equipmentid=parseInt($('#add').attr('name'))
        console.log(equipmentid)
        let equipmentName = $('#en').val();
        console.log(equipmentName)
        let equipmentImgPath = $('#picture')[0].files[0];
        let modelNumber = $('#mn').val();
        let quantity = $('#q').val();
        let status = $('#s').val();
        let location = $('#l').val();
        let categoryid = $('#cid').val();
        let supplierid = $('#sid').val();
        let filename=equipmentName.replace(/ /g,"_")
        const specificFileName = `${filename}.jpg`; // Replace with your desired file name
        
    formData.append('file', equipmentImgPath, specificFileName);
        
    // Send the file to the server via AJAX
    $.ajax({
      url: '/upload', // Replace with your server-side upload endpoint
      type: 'POST',
      data: formData,
      processData: false, // Prevent jQuery from processing the data
      contentType: false, // Prevent jQuery from setting a content-type header
      success: function (response) {
        $('#message').text('File uploaded successfully!');
      },
      error: function (xhr, status, error) {
        $('#message').text('Error uploading file: ' + error);
      }
    });

        const content = {
            equipmentid,
            equipmentName,
            specificFileName,
            modelNumber,
            quantity,
            status,
            location,
            categoryid,
            supplierid
        };

        $.ajax({
            type: "PUT",
            url: `/api/v1/equipment/${equipmentid}`,
            contentType: 'application/json', // Set content type to JSON
            data: JSON.stringify(content), // Convert content to JSON string
            success: function(data) {
                console.log(`Edited ${data}`); // Corrected string interpolation
                alert("Edited Successfully");
        //  $('#en').val('');
        //  $('#picture').val('');
        //  $('#mn').val('');
        //  $('#q').val('');
        //  $('#s').val('');
        //  $('#l').val('');
        //  $('#cid').val('');
        //  $('#sid').val('');
            },
            error: function(data) {
                console.log("Error message:", data.responseText);
                alert(data.responseText);
            }
        });
    });
});