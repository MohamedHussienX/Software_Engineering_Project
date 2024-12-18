$(document).ready(function(){
    $('#tbody').on('click', '.edit', function () {
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
    });
    $('#tbody').on('click', '.delete', function () {
        console.log("Deleted");
        let userid=$(this).attr("name")
        console.log(userid)
        $.ajax({
        type: "DELETE",
        
        url: `/api/v1/users/${userid}`,
        success: function(data){
            console.log(`Mabrook${data}`);
            alert("Deleted Successfully");
            window.location.href='/ManageUsers'
        },
        error: function(data){
            console.log("error message" , data.responseText)
            alert(data.responseText);
        }
      });
      });
      $(document).ready(function () {
        $("#search-button").click(function () {
          const searchField = $("#search").val(); // Dropdown value (e.g., UserID, UserName)
          const searchValue = $("#search-value").val(); // User input value
      
          if (!searchField || !searchValue) {
            alert("Please select a search field and enter a value.");
            return;
          }
      
          // Build the dynamic backend URL based on the search field
          let backendURL = "";
          if (searchField === "UserID") {
            backendURL = `/api/v1/searchuserid/${searchValue}`;
          } else if (searchField === "UserName") {
            backendURL = `/api/v1/searchusername/${searchValue}`;
          } else if (searchField === "Email") {
            backendURL = `/api/v1/searchemail/${searchValue}`;
          } else if (searchField === "Role") {
            backendURL = `/api/v1/searchrole/${searchValue}`;
          }
      
          // AJAX call to fetch filtered user data
          $.ajax({
            type: "GET",
            url: backendURL,
            success: function (serverResponse) {
              if (serverResponse.length > 0) {
                // Clear the table body
                $("#tbody").empty();
      
                // Populate table with search results
                serverResponse.forEach(function (user) {
                  $("#tbody").append(`
                    <tr id=${user.userid}>
                      <td class="text-center">${user.userid}</td>
                      <td class="text-center">
                        <input type="text" class="form-control" id="username${user.userid}" value="${user.username}">
                      </td>
                      <td class="text-center">${user.email}</td>
                      <td class="text-center">
                        <input type="text" class="form-control" id="role${user.userid}" value="${user.role}">
                      </td>
                      <td class="text-center">${user.createdat}</td>
                      <td class="text-center">
                        <button
                          id="delete${user.userid}"
                          class="btn btn-danger delete"
                          type="button"
                        >
                          Delete
                        </button>
                        <button
                          id="edit${user.userid}"
                          class="btn btn-primary edit"
                          type="button"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  `);
                });
              } else {
                // Display "No results found" if no users match the search criteria
                $("#tbody").empty();
                $("#tbody").append(`<tr><td colspan="6" class="text-center">No results found</td></tr>`);
              }
            },
            error: function (errorResponse) {
              console.error("Error fetching search results:", errorResponse.responseText);
              alert("An error occurred while fetching search results.");
            },
          });
        });
      });
      
}); 