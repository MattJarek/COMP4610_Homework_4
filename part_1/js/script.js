// https://formspree.io/blog/jquery-validate/ used for validate plugin help
$(function () {
  // Initialize the validation plugin on the form
  $("#vals").validate({
    rules: {
      min_col: {
        required: true,
        number: true,
        range: [-100, 100]
      },
      max_col: {
        required: true,
        number: true,
        range: [-100, 100]
      },
      min_row: {
        required: true,
        number: true,
        range: [-100, 100]
      },
      max_row: {
        required: true,
        number: true,
        range: [-100, 100]
      }
    },
    // Put the error message under the box
    errorPlacement: function (error, element) {
      // Get the name of the element id
      const name = element.attr("name");
      // Get the id name of the desired location
      const targetId = `#${name}_error_message`;
      // Put error message there
      $(targetId).html(error);
    },
    submitHandler: function (form) {
      // Get input values
      const min_col = Number($("#min_col").val());
      const max_col = Number($("#max_col").val());
      const min_row = Number($("#min_row").val());
      const max_row = Number($("#max_row").val());

      // Generate and display table
      const tableHTML = makeTable(min_col, max_col, min_row, max_row);
      $("#table").html(tableHTML);
    }
  });
});

// Takes 4 values, and creates a multiplication table with html format
function makeTable(min_col, max_col, min_row, max_row) {
  // Variable declaration
  var i;
  var j;
  var i_addend = 1;
  var j_addend = 1;
  var text = "<div class='row'> <div class='col'> <div class='scrollable-table'> <table class='center table'>\n  <tr> <th id='blank'>  </th>";

  // Creates the first row, contains the row values and makes them header table elements.
  if (max_row < min_row) {
    i_addend = -1;
  }
  i = min_row
  while (i != max_row + i_addend) {
    text += "<th id='number'>";
    text += i;
    text += "</th>";
    i = i + i_addend;
  }
  text += "</tr>";

  // Creates the rest of the table, makes the initial column values header table elements.
  if (max_col < min_col) {
    j_addend = -1;
  }
  j = min_col;
  while (j != max_col + j_addend) {
    text += "<tr>"
    i = min_row;
    text += "<th id='number'>";
    text += j;
    text += "</th>";
    while (i != max_row + i_addend) {
      text += "<td id='number'>";
      text += i * j;
      text += "</td>";
      i = i + i_addend;
    }
    j = j + j_addend;
    text += "</tr>";
  }
  text += "</table></div></div></div>";
  return text;
}
