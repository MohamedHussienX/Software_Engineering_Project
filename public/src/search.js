$(document).ready(function () {
  $("#search-button").click(function () {
      const searchField = $("#search").val(); // Dropdown value (e.g., Name, Status)
      const searchValue = $("#search-value").val(); // User input value
      console.log(searchValue)

      if (!searchField || !searchValue) {
          alert("Please select a search field and enter a value.");
          return;
      }

      // Backend URL dynamically built
      const backendURL = `/api/v1/searchname/${searchValue}`;
      if(searchField=="Name")
      {
      $.ajax({
          type: "GET",
          url: backendURL,
          success: function (serverResponse) {
              if (serverResponse.length > 0) {
                  // Clear the table body
                  $("#tbody").empty();

                  // Append only the search results to the table
                  serverResponse.forEach(function (item) {
                      $("#tbody").append(`
                          <tr id=${item.equipmentid}>
                              <td class="text-center">${item.equipmentid}</td>
                              <td class="text-center">${item.equipmentname}</td>
                              <td class="text-center">
                                  <img src="${item.equipmentimgpath}" alt="${item.equipmentname}" style="width: 100px; height: auto;">
                              </td>
                              <td class="text-center">${item.rating}</td>
                              <td class="text-center">${item.modelnumber}</td>
                              <td class="text-center">${item.quantity}</td>
                              <td class="text-center">${item.status}</td>
                              <td class="text-center">${item.location}</td>
                              <td class="text-center">${item.suppliername}</td>
                              <td class="text-center">${item.categoryname}</td>
                              <td class="text-center">
                                  <input type="text" class="form-control" id="e${item.equipmentid}" name="${item.equipmentname}" value="1">
                                  <button id="${item.equipmentname}" class="btn btn-danger remove" type="button">Add To Cart</button>
                                  <button id="/AddRating/${item.equipmentid}" class="btn btn-danger rating" type="button">Add Rating</button>
                              </td>
                          </tr>
                      `);
                  });
              } else {
                  // If no results are found
                  $("#tbody").empty();
                  $("#tbody").append(`<tr><td colspan="11" class="text-center">No results found</td></tr>`);
              }
          },
          error: function (errorResponse) {
              console.error("Error fetching search results:", errorResponse.responseText);
              alert("An error occurred while fetching search results.");
          },
      });}
      if (searchField == "Status") {
        const backendURL = `/api/v1/searchstatus/${searchValue}`;
        $.ajax({
            type: "GET",
            url: backendURL,
            success: function (serverResponse) {
                if (serverResponse.length > 0) {
                    $("#tbody").empty();
                    serverResponse.forEach(function (item) {
                        $("#tbody").append(`
                            <tr id=${item.equipmentid}>
                                <td class="text-center">${item.equipmentid}</td>
                                <td class="text-center">${item.equipmentname}</td>
                                <td class="text-center">
                                    <img src="${item.equipmentimgpath}" alt="${item.equipmentname}" style="width: 100px; height: auto;">
                                </td>
                                <td class="text-center">${item.rating}</td>
                                <td class="text-center">${item.modelnumber}</td>
                                <td class="text-center">${item.quantity}</td>
                                <td class="text-center">${item.status}</td>
                                <td class="text-center">${item.location}</td>
                                <td class="text-center">${item.suppliername}</td>
                                <td class="text-center">${item.categoryname}</td>
                                <td class="text-center">
                                    <input type="text" class="form-control" id="e${item.equipmentid}" name="${item.equipmentname}" value="1">
                                    <button id="${item.equipmentname}" class="btn btn-danger remove" type="button">Add To Cart</button>
                                    <button id="/AddRating/${item.equipmentid}" class="btn btn-danger rating" type="button">Add Rating</button>
                                </td>
                            </tr>
                        `);
                    });
                } else {
                    $("#tbody").empty();
                    $("#tbody").append(`<tr><td colspan="11" class="text-center">No results found</td></tr>`);
                }
            },
            error: function (errorResponse) {
                console.error("Error fetching search results:", errorResponse.responseText);
                alert("An error occurred while fetching search results.");
            },
        });
    }
    if (searchField == "Category") {
      const backendURL = `/api/v1/searchcategory/${searchValue}`;
      $.ajax({
          type: "GET",
          url: backendURL,
          success: function (serverResponse) {
              if (serverResponse.length > 0) {
                  $("#tbody").empty();
                  serverResponse.forEach(function (item) {
                      $("#tbody").append(`
                          <tr id=${item.equipmentid}>
                              <td class="text-center">${item.equipmentid}</td>
                              <td class="text-center">${item.equipmentname}</td>
                              <td class="text-center">
                                  <img src="${item.equipmentimgpath}" alt="${item.equipmentname}" style="width: 100px; height: auto;">
                              </td>
                              <td class="text-center">${item.rating}</td>
                              <td class="text-center">${item.modelnumber}</td>
                              <td class="text-center">${item.quantity}</td>
                              <td class="text-center">${item.status}</td>
                              <td class="text-center">${item.location}</td>
                              <td class="text-center">${item.suppliername}</td>
                              <td class="text-center">${item.categoryname}</td>
                              <td class="text-center">
                                  <input type="text" class="form-control" id="e${item.equipmentid}" name="${item.equipmentname}" value="1">
                                  <button id="${item.equipmentname}" class="btn btn-danger remove" type="button">Add To Cart</button>
                                  <button id="/AddRating/${item.equipmentid}" class="btn btn-danger rating" type="button">Add Rating</button>
                              </td>
                          </tr>
                      `);
                  });
              } else {
                  $("#tbody").empty();
                  $("#tbody").append(`<tr><td colspan="11" class="text-center">No results found</td></tr>`);
              }
          },
          error: function (errorResponse) {
              console.error("Error fetching search results:", errorResponse.responseText);
              alert("An error occurred while fetching search results.");
          },
      });
  }
  if (searchField == "Supplier") {
    const backendURL = `/api/v1/searchsupplier/${searchValue}`;
    $.ajax({
        type: "GET",
        url: backendURL,
        success: function (serverResponse) {
            if (serverResponse.length > 0) {
                $("#tbody").empty();
                serverResponse.forEach(function (item) {
                    $("#tbody").append(`
                        <tr id=${item.equipmentid}>
                            <td class="text-center">${item.equipmentid}</td>
                            <td class="text-center">${item.equipmentname}</td>
                            <td class="text-center">
                                <img src="${item.equipmentimgpath}" alt="${item.equipmentname}" style="width: 100px; height: auto;">
                            </td>
                            <td class="text-center">${item.rating}</td>
                            <td class="text-center">${item.modelnumber}</td>
                            <td class="text-center">${item.quantity}</td>
                            <td class="text-center">${item.status}</td>
                            <td class="text-center">${item.location}</td>
                            <td class="text-center">${item.suppliername}</td>
                            <td class="text-center">${item.categoryname}</td>
                            <td class="text-center">
                                <input type="text" class="form-control" id="e${item.equipmentid}" name="${item.equipmentname}" value="1">
                                <button id="${item.equipmentname}" class="btn btn-danger remove" type="button">Add To Cart</button>
                                <button id="/AddRating/${item.equipmentid}" class="btn btn-danger rating" type="button">Add Rating</button>
                            </td>
                        </tr>
                    `);
                });
            } else {
                $("#tbody").empty();
                $("#tbody").append(`<tr><td colspan="11" class="text-center">No results found</td></tr>`);
            }
        },
        error: function (errorResponse) {
            console.error("Error fetching search results:", errorResponse.responseText);
            alert("An error occurred while fetching search results.");
        },
    });
}
  
    
  });
});
