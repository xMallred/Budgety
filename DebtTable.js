
var debtTable = document.getElementById('debtTable');
var budgetTable = document.getElementById('budgetTable');
export var DebtTable = {
    createTable: function() {
        debtTable.innerHTML = "";
        this.setFirstRow();
        this.setDebts();
    },

    setFirstRow: function() {
        var row = document.createElement('tr');
        this.addHeaderCell(row, "Debt Name");
        this.addHeaderCell(row, "Debt Amount");
        this.addHeaderCell(row, "Debt As Of " + budgetTable.firstElementChild.lastChild.innerHTML)
        debtTable.appendChild(row);
    },

    setDebts: function() {
        let i = 1;
        while(document.getElementById("debt" + i + "Name") != null && !document.getElementById("debt" + i + "Amount") != null && !document.getElementById("debt" + i + "InterestPercent") != null){
            if(document.getElementById("debt" + i + "Name").value != "" || !document.getElementById("debt" + i + "Amount") != "" || !document.getElementById("debt" + i + "InterestPercent") != "") {
                var debtRow = document.createElement('tr');
                this.addBoldCell(debtRow,document.getElementById("debt" + i + "Name").value);
                this.addCell(debtRow, '$' + document.getElementById("debt" + i + "Amount").value);
                this.addCell(debtRow, "TBD");
                debtTable.appendChild(debtRow);
            }
            i++;
        }
        var debtRow = document.createElement('tr');
    },

    addHeaderCell: function(tr, val) {
        var th = document.createElement('th');
        th.innerHTML = val;
        tr.appendChild(th)
    },
    
    addCell: function(tr, val) {
        var td = document.createElement('td');
        td.innerHTML = val;
        tr.appendChild(td)
    },
    
    addBoldCell: function(tr, val) {
        var td = document.createElement('td');
        td.innerHTML = val;
        td.style = "font-weight:bold";
        tr.appendChild(td)
    }
}