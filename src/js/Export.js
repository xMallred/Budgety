export var ExportFunctions = {
  saveTable: function () {
    var debtTable = document.getElementById('debtTable');
    var budgetTable = document.getElementById('budgetTable');
    this.saveTableHelper(budgetTable, "budgetTable.csv");
    this.saveTableHelper(debtTable, "debtTable.csv");
  },

  saveTableHelper: function (table, tableName) {
    var csv = [];
    var rows = table.rows;
    console.log(rows.length);
    for (var i = 0; i < rows.length; i++) {
      var row = [];
      var cells = rows[i].cells;
      for (var j = 0; j < cells.length; j++) {
        row.push(cells[j].innerText);
      }
      csv.push(row.join(","));
    }
    console.log(csv);

    let csvContent = "data:text/csv;charset=utf-8,";
    csv.forEach(function (rowArray) {
      csvContent += rowArray + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", tableName);
    document.body.appendChild(link);

    link.click();
  }
}