import {capitalize} from "./Formatting.js";

var budgetTable = document.getElementById('budgetTable');
var currentBalances = [];
var payDates = [];

export var BudgetTable = {
    
    createTable: function() {
        budgetTable.innerHTML = "";
        
        currentBalances = [];
        payDates = [];
        this.addDateRow(budgetTable);
        this.addPayRow(budgetTable);
        this.addExpenseRows(budgetTable);
        this.addRemainingBalanceRow(budgetTable);
    },

    addDateRow: function(budgetTable) {
        var payFrequency = document.getElementById("payFrequency").value;
        var payDay = document.getElementById("payDay").value;
        var budgetLength = document.getElementById("budgetLength").value;
        
        var dateRow = document.createElement('tr');
        this.addBoldCell(dateRow, "Pay Date");
        
        if(payFrequency === "biWeekly") {
            var date;
            if(payDay !== "") {
                var date = new Date(payDay);
                    //This is done becuase of date conversion, it sets the date to a day before selected date
                date.setDate(date.getDate() + 1);
            }
            else {
                date = new Date();
            }
        
            for(let i = 0; i < budgetLength; i++){
                payDates.push(new Date(date));
                var formattedDate = ('0'+(date.getMonth()+1)).slice(-2) + "/" + ('0'+(date.getDate())).slice(-2) + "/" + date.getFullYear();
                this.addHeaderCell(dateRow, formattedDate);
                date.setDate(date.getDate() + 14);
            }
        }
        
        if(payFrequency === "semiMonthly") {
            var TodayDate = new Date();
            var day = TodayDate.getDate();
            var month = TodayDate.getMonth();
            var year = TodayDate.getFullYear();
            if (day <= 15) {
                day = 15;
            }
            else if(day > 15) {
                var lastDayOfMonth = new Date(year, month, 0);
                day = lastDayOfMonth.getDate();
            }
            for(let i = 0; i < budgetLength; i++){
                if (month == 11) {
                    month = 0;
                    year++;
                }
        
                var payDate = new Date(year, month, day);
                payDates.push(new Date(payDate));
                var formattedDate = ('0'+(payDate.getMonth()+1)).slice(-2) + "/" + ('0'+(payDate.getDate())).slice(-2) + "/" + payDate.getFullYear();
                this.addHeaderCell(dateRow, formattedDate);
        
                var lastDayOfMonth = new Date(year, month + 1, 0);
                if(day == 15){
                    day = lastDayOfMonth.getDate();
                }
                else if(day == lastDayOfMonth.getDate()){
                    day = 15;
                    month++;
                }
            }
        }
        
        if(payFrequency === "monthly") {
            var TodayDate = new Date();
            var month = TodayDate.getMonth();
            var year = TodayDate.getFullYear();
            for(let i = 0; i < budgetLength; i++) {
                if (month == 11) {
                    month = 0;
                    year++;
                }
                else {
                    month++;
                }
                var payDate = new Date(year, month, 0);
                payDates.push(new Date(payDate));
                var formattedDate = ('0'+(payDate.getMonth()+1)).slice(-2) + "/" + ('0'+(payDate.getDate())).slice(-2) + "/" + payDate.getFullYear();
                this.addHeaderCell(dateRow, formattedDate);
            }
        
        }
        
        budgetTable.appendChild(dateRow);
    },

    addPayRow: function(budgetTable) {
        var budgetLength = document.getElementById("budgetLength").value;
        var payCheck = document.getElementById("payCheck").value;
        
        var payRow = document.createElement('tr');
        this.addBoldCell(payRow, "Pay");
        for(let i = 0; i < budgetLength; i++){
            this.addCell(payRow, '$' + payCheck);
        }
        budgetTable.appendChild(payRow);
    },

    addExpenseRows: function(budgetTable) {
    var budgetLength = document.getElementById("budgetLength").value;
    var payFrequency = document.getElementById("payFrequency").value;

    for(let i = 0; i < budgetLength; i++) {
        currentBalances.push(0);
    }
    let i = 1;
    while(document.getElementById("expense" + i + "Amount") != null && !document.getElementById("expense" + i + "Frequency") != null){
        var expenseAmount = document.getElementById("expense" + i + "Amount").value;
        var expenseFrequency = document.getElementById("expense" + i + "Frequency").value;
        if(expenseAmount !== "") {
            var expenseRow = document.createElement('tr');
            var expenseName = document.getElementById("expense" + i + "Name").value;
            this.addBoldCell(expenseRow, capitalize(expenseName));
            for(let j = 0; j < budgetLength; j++) {
                if (payFrequency === "monthly") {
                    this.addCell(expenseRow, "-$" + expenseAmount);
                    currentBalances[j] = currentBalances[j] + parseFloat(expenseAmount);
                }
                else {
                    if(expenseFrequency === "onceAMonth") {
                        //PayDay Date
                        var payDay = payDates[j];

                        //Last Date of pay cycle for this check (i.e last day before next pay check)
                        var LastDayOfPayCycle = new Date(payDay);
                        LastDayOfPayCycle.setDate(LastDayOfPayCycle.getDate() + 14);
                        
                        //Date of expense
                        var dayOfExpense = document.getElementById("expense" + i + "Date").value;
                        var month = payDay.getMonth();
                        var year = payDay.getFullYear();
                        if(dayOfExpense < payDay.getDate()) {
                            month++;
                            if(month == 12) {
                                year++;
                                month = 0;
                            }
                        }
                        var expenseDate = new Date(year, month, dayOfExpense);

                        //set timestamp to 0 for correct comparison
                        expenseDate.setHours(0,0,0,0);
                        payDay.setHours(0,0,0,0);
                        LastDayOfPayCycle.setHours(0,0,0,0);
                        if(expenseDate.getTime() >= payDay && expenseDate.getTime() < LastDayOfPayCycle.getTime()) {
                            this.addCell(expenseRow, "-$" + expenseAmount);
                            currentBalances[j] = currentBalances[j] + parseFloat(expenseAmount);
                        }
                        else {
                            this.addCell(expenseRow, "");
                        }
                    }
                    else if(expenseFrequency === "onceAPaycheck"){
                        this.addCell(expenseRow, "-$" + expenseAmount);
                        currentBalances[j] = currentBalances[j] + parseFloat(expenseAmount);
                    }
                }
            }
            budgetTable.appendChild(expenseRow);
        }
        i++;
    }
},

    addRemainingBalanceRow: function(budgetTable) {
        var balanceRow = document.createElement('tr');
        this.addBoldCell(balanceRow, "Balance")
        var payCheck = document.getElementById("payCheck").value;
        for(var i = 0; i < currentBalances.length; i++) {
            this.addCell(balanceRow, '$' + (parseFloat(payCheck) - currentBalances[i]));
        }
        budgetTable.appendChild(balanceRow);
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
};