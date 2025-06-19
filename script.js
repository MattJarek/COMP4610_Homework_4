// https://www.tutorialspoint.com/jqueryui/jqueryui_slider.htm used for slide and tab help
$(function () {
  // Make the tab group
  $("#tabs").tabs();
  // Make an counter for tabs
  var tabCnt = 1;
  // Initialize all 4 sliders and implement two way binding
  setupSlider("#slider_min_col", "#min_col");
  setupSlider("#slider_max_col", "#max_col");
  setupSlider("#slider_min_row", "#min_row");
  setupSlider("#slider_max_row", "#max_row");

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

      // Make a new tab id
      const tabID = `tab-${tabCnt}`
      // Create tab label text from input values
      const label = `(${min_col},${max_col}) x (${min_row},${max_row})`;
      // Add a new <li> to the <ul> tab headers
      $("#tabs ul").append(
        `<li>
          <input type="checkbox" class="tab-checkbox" data-tab="#${tabID}">
          <a href="#${tabID}">${label}</a> <span class="ui-icon ui-icon-close" role="presentation">Remove</span>
        </li>`
      );

      // Add a new <div> with the generated table
      $("#tabs").append(`<div id="${tabID}">${makeTable(min_col, max_col, min_row, max_row)}</div>`);

      // Refresh the tabs widget so the new tab appears
      $("#tabs").tabs("refresh");
      // increment the counter
      tabCnt += 1;
    }
  });
  // Close icon: remove the tab on click
  $("#tabs").on("click", "span.ui-icon-close", function () {
    const panelId = $(this).closest("li").remove().attr("aria-controls");
    $("#" + panelId).remove();
    $("#tabs").tabs("refresh");
  });
  // Delete selected tabs
    $("#delete-tabs").on("click", function () {
      $(".tab-checkbox:checked").each(function () {
        const tabSelector = $(this).data("tab");

        // Remove tab header
        $(this).closest("li").remove();

        // Remove tab content
        $(tabSelector).remove();
      });

      // Refresh the tabs
      $("#tabs").tabs("refresh");
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

function setupSlider(sliderSelector, inputSelector) {
  // Set up the sliders
  $(sliderSelector).slider({
    min: -100,
    max: 100,
    value: parseInt($(inputSelector).val()) || 0,
    slide: function (event, ui) {
      $(inputSelector).val(ui.value);
      updatePreview();
    }
  });
  //two way binding
  $(inputSelector).on("input", function () {
    // Get the value from the input field
    const val = parseInt($(this).val());
    // If value is valid, update slider
    if (!isNaN(val) && val >= -100 && val <= 100) {
      $(sliderSelector).slider("value", val);
    }
    updatePreview();
  });

}

function updatePreview() {
  if ($("#vals").valid()) {
    const min_col = Number($("#min_col").val());
    const max_col = Number($("#max_col").val());
    const min_row = Number($("#min_row").val());
    const max_row = Number($("#max_row").val());

    const tableHTML = makeTable(min_col, max_col, min_row, max_row);
    $("#table-preview").html(tableHTML);
  } else {
    $("#table-preview").html("");  // Clear preview if invalid
  }
}