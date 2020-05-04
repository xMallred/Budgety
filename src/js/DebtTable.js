import {BudgetTable} from './BudgetTableScript.js';

var debtTable = document.getElementById('debtTable');
var budgetTable = document.getElementById('budgetTable');
export var DebtTable = {
  createTable: function () {
    debtTable.innerHTML = "";
    this.setFirstRow();
    this.setDebts();
  },

  setFirstRow: function () {
    var row = document.createElement('tr');
    this.addHeaderCell(row, "Debt Name");
    this.addHeaderCell(row, "Principal Amount")
    this.addHeaderCell(row, "Current Balance");
    this.addHeaderCell(row, "Balance as of: "
        + budgetTable.firstElementChild.lastChild.innerHTML)
    this.addHeaderCell(row, "Amount Paid as of: "
        + budgetTable.firstElementChild.lastChild.innerHTML);
    this.addHeaderCell(row, "Interest accrued as of: "
        + budgetTable.firstElementChild.lastChild.innerHTML)
    debtTable.appendChild(row);
  },

  setDebts: function () {
    let i = 1;
    while (document.getElementById("debt" + i + "Name") != null
    && !document.getElementById("debt" + i + "Amount") != null
    && !document.getElementById("debt" + i + "InterestPercent") != null) {
      var debtName = document.getElementById("debt" + i + "Name").value;
      var debtAmount = document.getElementById("debt" + i + "Amount").value;
      var debtInterestPercent = document.getElementById("debt" + i
          + "InterestPercent").value;
      var principalAmount = document.getElementById("debt" + i
          + "Principal").value;
      if (debtName != "" || debtAmount != "" || debtInterestPercent != "") {
        var debtRow = document.createElement('tr');
        this.addBoldCell(debtRow, debtName);

        var remainingBalance = debtAmount;
        var budgetTableRows = budgetTable.children;
        var remainingPrincipal = principalAmount;
        var amountPaid = 0;
        var totalInterestAccrued = 0;
        var debtBeingPaidRowNumber = this.debtBeingPaidRow(budgetTableRows,
            debtName);

        var paidOff = false;
        var datesRowChildren = budgetTableRows[0].children;
        var totalDaysPassed = 0;

        for (let z = 1; z < datesRowChildren.length; z++) {
          var thedate = datesRowChildren[z].innerHTML;
          console.log("currentDate: " + thedate);
          var daysPassed = 0;
          //finds number of days between 'current' pay date and 'next' pay date
          if (z > 1) {
            daysPassed = this.daysPassed(datesRowChildren, z);
            totalDaysPassed = parseInt(totalDaysPassed) + parseInt(daysPassed);
          }

          console.log(daysPassed)
          //finds interest accrued in number of days since last payment
          if (daysPassed != 0 && debtInterestPercent != ""
              && debtInterestPercent != 0) {
            var dailyInterestPercent = (parseFloat(debtInterestPercent) / 100)
                / 365;
            var dailyCharge = parseFloat(remainingPrincipal) * parseFloat(
                dailyInterestPercent);
            console.log("daily interest: " + dailyCharge);
            var interestAccrued = parseFloat(dailyCharge) * daysPassed;
            interestAccrued = interestAccrued.toFixed(2);
            totalInterestAccrued = parseFloat(totalInterestAccrued)
                + parseFloat(interestAccrued);
            remainingBalance = parseFloat(remainingBalance) + parseFloat(
                interestAccrued);
            console.log("interest added: " + interestAccrued);
          }

          console.log("here")
          if (debtBeingPaidRowNumber != -1) {
            var budgetTableRowChildren = budgetTableRows[debtBeingPaidRowNumber].children;
            //checks if payment was made, then adds payment to 'amountPaid'
            if (budgetTableRowChildren[z].innerHTML != "") {
              console.log("Remaining Balance before payment: "
                  + remainingBalance);
              console.log("Remainig Principal Before Payment: "
                  + remainingPrincipal)
              var loanPayment = budgetTableRowChildren[z].innerHTML.match(
                  /[\d\.]+/);
              console.log("amount paid: " + amountPaid);

              amountPaid = parseFloat(amountPaid) + parseFloat(loanPayment);
              remainingBalance = parseFloat(remainingBalance) - parseFloat(
                  loanPayment);
              if (remainingBalance < 0) {
                var leftOver = -1 * parseFloat(remainingBalance);
                leftOver = leftOver.toFixed(2);
                amountPaid = parseFloat(amountPaid) - parseFloat(leftOver);
                remainingBalance = 0;
                paidOff = true;
              }
              if (remainingBalance < remainingPrincipal) {
                remainingPrincipal = remainingBalance;
              }
              console.log("Remaining Balance after payment: "
                  + remainingBalance);
              console.log("Remaining Principal After Payment: "
                  + remainingPrincipal)
            }
          }

          if (paidOff) {
            break;
          }
        }

        console.log("total days passed: " + totalDaysPassed);
        remainingBalance = parseFloat(remainingBalance).toFixed(2);
        amountPaid = parseFloat(amountPaid).toFixed(2);
        totalInterestAccrued = parseFloat(totalInterestAccrued).toFixed(2);
        this.addCell(debtRow, '$' + principalAmount);
        this.addCell(debtRow, '$' + debtAmount);
        this.addCell(debtRow, '$' + remainingBalance);
        this.addCell(debtRow, '$' + amountPaid);
        this.addCell(debtRow, '$' + totalInterestAccrued);
        debtTable.appendChild(debtRow);
      }
      i++;
    }
    var debtRow = document.createElement('tr');
  },

  addHeaderCell: function (tr, val) {
    var th = document.createElement('th');
    th.innerHTML = val;
    tr.appendChild(th)
  },

  addCell: function (tr, val) {
    var td = document.createElement('td');
    td.innerHTML = val;
    tr.appendChild(td)
  },

  addBoldCell: function (tr, val) {
    var td = document.createElement('td');
    td.innerHTML = val;
    td.style = "font-weight:bold";
    tr.appendChild(td)
  },

  daysPassed: function (datesRowChildren, z) {
    var currentDateString = datesRowChildren[z].innerHTML;
    var previousDateString = datesRowChildren[z - 1].innerHTML;
    var currentDateParts = currentDateString.split('/');
    var previousDateParts = previousDateString.split('/');
    var currentDate = new Date(currentDateParts[2], currentDateParts[0] - 1,
        currentDateParts[1]);
    var previousDate = new Date(previousDateParts[2], previousDateParts[0] - 1,
        previousDateParts[1]);

    var daysPassed = Math.round(currentDate.getTime() - previousDate.getTime())
        / (1000 * 60 * 60 * 24);
    return daysPassed.toFixed(0);
  },

  debtBeingPaidRow: function (budgetTableRows, debtName) {
    console.log(debtName);
    var debtBeingPaidRowNumber = -1;
    if (budgetTableRows.length > 3) {
      for (let i = 2; i < budgetTableRows.length - 1; i++) {
        if (budgetTableRows[i].firstChild.innerHTML === debtName) {
          debtBeingPaidRowNumber = i;
        }
      }
    }
    return debtBeingPaidRowNumber;
  }

}