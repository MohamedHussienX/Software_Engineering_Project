$(document).ready(function() {
    $('#add').click(function(event) {
        event.preventDefault(); // Prevent default form submission if inside a form
        console.log('Added');

        let equipmentName = $('#en').val();
        let equipmentImgPath = $('#ei').val();
        let modelNumber = $('#mn').val();
        let quantity = $('#q').val();
        let status = $('#s').val();
        let location = $('#l').val();
        let categoryid = $('#cid').val();
        let supplierid = $('#sid').val();

        const content = {
            equipmentName,
            equipmentImgPath,
            modelNumber,
            quantity,
            status,
            location
        };

        $.ajax({
            type: "POST",
            url: '/api/v1/equipment/new',
            contentType: 'application/json', // Set content type to JSON
            data: JSON.stringify(content), // Convert content to JSON string
            success: function(data) {
                console.log(`Added ${data}`); // Corrected string interpolation
                alert("Added Successfully");
            },
            error: function(data) {
                console.log("Error message:", data.responseText);
                alert(data.responseText);
            }
        });
    });
});