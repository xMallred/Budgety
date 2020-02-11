import {capitalize} from "./Formatting.js";
import {BudgetTable} from './BudgetTableScript.js';
var numberOfExpenses = 1;

export function addExpense() {
    numberOfExpenses++;
    var expenseContainer = document.getElementById("expenseContainer");
    var newExpenseContainer = document.createElement("div");
    newExpenseContainer.id = "expense" + numberOfExpenses + "Container";
    newExpenseContainer.appendChild(document.createTextNode("Expense #" + numberOfExpenses + ": "));
    
    var expenseName = document.createElement("input");
    var expenseNameId = "expense" + numberOfExpenses + "Name";
    expenseName.id = expenseNameId;
    expenseName.type = "text";
    expenseName.placeholder = "Expense Name";
    expenseName.addEventListener("change", function() {
        BudgetTable.createTable();
    });
    newExpenseContainer.appendChild(expenseName);
    newExpenseContainer.appendChild(document.createTextNode( '\u00A0' ));

    var expenseAmount = document.createElement("input");
    var expenseAmountId = "expense" + numberOfExpenses + "Amount";
    expenseAmount.id = expenseAmountId;
    expenseAmount.type = "number";
    expenseAmount.placeholder = "Expense Amount";
    expenseAmount.addEventListener("change", function() {
        BudgetTable.createTable();
    });
    newExpenseContainer.appendChild(expenseAmount);
    newExpenseContainer.appendChild(document.createTextNode( '\u00A0' ));

    var expenseFrequency = document.createElement("select");
    var expenseFrequencyId = "expense" + numberOfExpenses + "Frequency";
    expenseFrequency.id = expenseFrequencyId;
    var expenseFrequencyOption1 = document.createElement("option");
    expenseFrequencyOption1.value = "onceAPaycheck";
    expenseFrequencyOption1.innerHTML = "Once A Pay Check";
    var expenseFrequencyOption2 = document.createElement("option");
    expenseFrequencyOption2.value = "onceAMonth";
    expenseFrequencyOption2.innerHTML = "Once A Month"
    expenseFrequency.appendChild(expenseFrequencyOption1);
    expenseFrequency.appendChild(expenseFrequencyOption2);
    newExpenseContainer.appendChild(expenseFrequency);

    expenseFrequency.addEventListener("change", function(){
        var expenseFrequencyNumber = expenseFrequency.id.match(/\d/g);
        var idNumber = expenseFrequencyNumber.join("");
        var expenseDateId = "expense" + idNumber + "Date";
        if(expenseFrequency.value === "onceAMonth") {
            var expenseContainer = document.getElementById(newExpenseContainer.id);
            var expenseDate = document.createElement("input");
            expenseDate.id = expenseDateId;
            expenseDate.type = "number";
            expenseDate.placeholder = "Day Of Expense";
            expenseDate.max = 31;
            expenseDate.addEventListener("change", function() {
                BudgetTable.createTable();
            });
            newExpenseContainer.appendChild(document.createTextNode( '\u00A0' ));
            newExpenseContainer.appendChild(expenseDate);
        }
        else if(expenseFrequency.value === "onceAPaycheck") {
            var expenseContainer = document.getElementById(newExpenseContainer.id);
            var expenseDate = document.getElementById(expenseDateId);
            newExpenseContainer.removeChild(expenseDate);
        }
        BudgetTable.createTable();
    });

    expenseContainer.appendChild(newExpenseContainer);
}