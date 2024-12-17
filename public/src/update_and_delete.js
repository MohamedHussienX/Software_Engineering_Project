$(document).ready(function(){
    $('#tbody').on('click', '.Updatebutton', function () {
      console.log("Updated");
      var equipmentname = $(this).attr("id");
      let cartid=$(this).closest('tr').find('td:first').text();
      console.log(cartid)
      let quantity = $(`#${cartid}`).val();
      console.log("Quantity:", quantity);
      data={
        cartid,
        quantity
      }
      $.ajax({
      type: "PUT",
      data ,
      url: `/api/v1/cart/${cartid}`,
      success: function(data){
          console.log(`Mabrook${data}`);
          alert("Updated Successfully");
      },
      error: function(data){
          console.log("error message" , data.responseText)
          alert(data.responseText);
      }
    });
    });
    $('#tbody').on('click', '.delete', function () {
        console.log("Deleted");
        let cartid=$(this).closest('tr').find('td:first').text();
        console.log(cartid)
        $.ajax({
        type: "DELETE",
        
        url: `/api/v1/cart/delete/${cartid}`,
        success: function(data){
            console.log(`Mabrook${data}`);
            alert("Deleted Successfully");
            window.location.href='/Cart' 
        },
        error: function(data){
            console.log("error message" , data.responseText)
            alert(data.responseText);
        }
      });
      });
}); 