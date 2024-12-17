$(document).ready(function(){
    // #submit means id = "submit"
    $("#submit").click(function() {
      console.log("here");
      const equipmentname = $('#equipmentname').val();
      const score = $('#score').val();
      const comment = $('#comment').val();        
     

      if(!equipmentname || !comment || !score){
        alert("missing info");
        return;
      }

      const rate= {equipmentname,score,comment};
      console.log(rate)
      
      $.ajax({
        type: "POST",
        url: '/api/v1/rating/new',
        data: rate,
        success: function (data){
            $('#equipmentname').val("");
            $('#score').val("");
            $('#comment').val("");        
            console.log("message from server",data);
            alert(data);
          },
        error : function(data){
          alert(data.responseText);
        }
      });
    });
});