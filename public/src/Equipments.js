$(document).ready(function(){
    // #tbody means id = "tbody"
    // .remove means class = "remove"
    $('#tbody').on('click', '.remove', function () {
      console.log("Added To Cart");
      var equipmentname = $(this).attr("id");
      let quntityid = $(this).parent().parent().attr("id")
      let quantity = $(`#e${quntityid}`).val();
      console.log(equipmentname)
      console.log("Quantity:", quantity);
      data={
        equipmentname,
        quantity,
      }
      $.ajax({
      type: "POST",
      data ,
      url: '/api/v1/cart/new',
      success: function(data){
          console.log(`Hello ${data}`);
          alert("Added successfully");
      },
      error: function(data){
          console.log("error message" , data.responseText)
          alert(data.responseText);
      }
    });
    });


    
});    