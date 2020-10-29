/*
  File: /~bfriedm1/HW05/js/javascript.js
  COMP.4610 GUI Programming I
  Assignment 5: Create a dynamic table using javascript
    - design and style a webpage using HTML/CSS that will take user input
      and from there construct below the form a table with starting and ending
      values for the rows/columns as determined by the user input.
  Name: Benjamin G. Friedman
  Email: benjamin_friedman@student.uml.edu
  Copyright (C) 2020 by Benjamin G. Friedman. All rights reserved. May be freely
  copied or excerpted for educational purposes with credit to the author.
  updated by BGF on 10/25/20.
*/

// global variables for the row maxes/mins
var row_min, row_max, column_min, column_max;

// function to get user input
function getUserInput() {

  row_min = parseInt(document.getElementById("row_min").value);
  row_max = parseInt(document.getElementById("row_max").value);
  col_min = parseInt(document.getElementById("col_min").value);
  col_max = parseInt(document.getElementById("col_max").value);

  // only generate table if input is valid. If input is not valid,
  // validateUserInput() will display error messages on the browser
  if (validateUserInput()){
      generateTable();
  }
}

/*
  Validates user input. Invalid user input is any of the following:
    - entering a character instead of a number
    - entering a number less than -50 or greater than 50
    - the minimum value in the row or column is greater than the
      corresponding maximum value in the row or column.
  Upon invalid input, an appropiate error message will be displayed and
  generateTable() will not be called.
*/
function validateUserInput() {
  // validate the user entered all numbers
  if (!Number.isInteger(row_min) || !Number.isInteger(row_max)
      || !Number.isInteger(col_min) || !Number.isInteger(col_max))
  {
    let tableDiv = document.getElementById("table-placeholder");
    tableDiv.innerHTML = "Input Error. Please enter only integers.";
    return false;
  }

  else if (row_min < -50 || row_min > 50 || row_max < -50 || row_max > 50 ||
    col_min < -50 || col_min > 50 || col_max < -50 || col_max > 50)
  {
    let tableDiv = document.getElementById("table-placeholder");
    tableDiv.innerHTML = "Input Error. Please integers between -50 and 50.";
    return false;
  }

  else if (row_min > row_max || col_min > col_max) {
    let tableDiv = document.getElementById("table-placeholder");
    tableDiv.innerHTML = "Input Error. Row and column min's must be less than maxes.";
    return false;
  }

  return true;
}

/*
  Function to generate the table. It first prints out the top row
  with the column values/x-values as headers. Then, prints out the
  rest of the table row-by-row. In order to style the table, 3 classes
  were made for the top row, the left column, and the inner cells. The
  classes are customized accordingly in a css file.
*/
function generateTable()
{
    // clear current table
    var tableDiv = document.getElementById("table-placeholder");
    while (tableDiv.hasChildNodes()) {
      tableDiv.firstChild.remove();
    }
    console.log("here");

    // create the table
    var table = document.createElement("table");
    table.setAttribute("class", "center");
    tableDiv.appendChild(table);

    // create header row
    var newRow = document.createElement("tr");
    table.appendChild(newRow);

    // create headers in header row. Each header getElement
    // is a member of the header-cell class
    var newHeader = document.createElement("th");
    newHeader.setAttribute("class", "header-cell");
    newHeader.setAttribute("id", "top-left");
    newRow.appendChild(newHeader);
    for (let x = col_min; x <= col_max; x++) {
      newHeader = document.createElement("th");
      newHeader.setAttribute("class", "header-cell");
      newHeader.textContent = x;
      newRow.appendChild(newHeader);
    }

    // start filling up rows
    let switch_cell = 1;  // switch cell is used to print in checker pattern
    for (let y = row_min; y <= row_max; y++) {
      // create new row
      newRow = document.createElement("tr");
      table.appendChild(newRow);

      // add items to row. The left most element in the row
      // is a member of the left-cell class. The rest of the
      // elements in the row are members of the table-cell class.
      let newCell = document.createElement("td");
      newCell.textContent = y;
      newCell.setAttribute("class", "left-cell");
      newRow.appendChild(newCell);
      for (let x = col_min; x <= col_max; x++) {
        newCell = document.createElement("td");
        newCell.textContent = x * y;
        // alternate switch_cell between 0 and 1 every round of printing.
        // this way, it swaps the order in which table-cell_1 is assigned
        // and table-cell_2 is assigned.
        if (switch_cell == 1) {
          if (x % 2 == 0) {
            newCell.setAttribute("class", "table-cell_1");
            newRow.appendChild(newCell);
          }
          else {
            newCell.setAttribute("class", "table-cell_2");
            newRow.appendChild(newCell);
          }
        }
        else {
          if (x % 2 == 0) {
            newCell.setAttribute("class", "table-cell_2");
            newRow.appendChild(newCell);
          }
          else {
            newCell.setAttribute("class", "table-cell_1");
            newRow.appendChild(newCell);
          }
        }
        // when done printing a row, swtich switch_cell to 0 or 1.
        if (x == col_max) {
          if (switch_cell == 1) {
            switch_cell = 0;
          }
          else {
            switch_cell = 1;
          }
        }
      }
    }
}
