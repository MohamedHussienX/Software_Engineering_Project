$(document).ready(function(){
    $("#addorder").click(function() {  
    data="New Order has been successfully added",
      $.ajax({
        type: "POST",
        url: '/api/v1/order/new',
        data,    
        success: function (data){
            console.log("message from server",data);
            alert(data)
            window.location.href='/order'
          },
        error : function(data){
          alert(data.responseText);
        }
      });
    });
});