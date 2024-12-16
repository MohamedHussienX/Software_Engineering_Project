$(document).ready(function(){
    // #tbody means id = "tbody"
    // .remove means class = "remove"
    $('#tbody').on('click', '.remove', function () {
      console.log("Added To Cart");
      var equipmentname = $(this).attr("id");
      const quantity="1"
      data={
        equipmentname,
        quantity,
      }
      $.ajax({
      type: "POST",
      data ,
      url: '/api/v1/cart/new',
      success: function(data){
          console.log(data);
          alert("Added successfully");
      },
      error: function(data){
          console.log("error message" , data.responseText)
          alert(data.responseText);
      }
    });
    });


    
});    