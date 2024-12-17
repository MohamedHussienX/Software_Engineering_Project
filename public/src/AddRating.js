$(document).ready(function(){
      // #tbody means id = "tbody"
      // .remove means class = "remove"
      $('#tbody').on('click', '.rating', function () {
        window.location.href= $(this).attr("id")
      });


      
});      