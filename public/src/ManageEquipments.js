$(document).ready(function(){
   /* $('#tbody').on('click', '.edit', function () {
      console.log("Edit");
      var userid = $(this).attr("name");
      console.log(userid)
      let username=$(`#username${userid}`).val()
      let role=$(`#role${userid}`).val();
      data={
        username,
        role
      }
      $.ajax({
      type: "PUT",
      data ,
      url: `/api/v1/users/${userid}`,
      success: function(data){
          console.log(`Mabrook${data}`);
          alert("Updated Successfully");
          window.location.href='/ManageUsers'
      },
      error: function(data){
          console.log("error message" , data.responseText)
          alert(data.responseText);
      }
    });
    });*/
    $('#tbody').on('click', '.remove', function () {
        console.log("Delete");
        let equipid=$(this).attr("id")
        console.log(equipid)
        $.ajax({
        type: "DELETE",
        
        url: `/api/v1/equipment/${equipid}`,
        success: function(data){
            console.log(`Deleted ${data}`);
            alert("Deleted Successfully");
            window.location.href='/ManageEquipments'
        },
        error: function(data){
            console.log("error message" , data.responseText)
            alert(data.responseText);
        }
      });
      });
      $("#addequip").click(function() {
        // Redirect to the desired view
        window.location.href = '/AddEquipment'; // Replace with your desired URL
    }); 
      
}); 
