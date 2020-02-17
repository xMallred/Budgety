import {BudgetTable} from './BudgetTableScript.js';
import {addExpense} from './Expenses.js';
import {addDebt} from './Debt.js';
import { DebtTable } from './DebtTable.js';

var menuField = document.getElementById("menu");

var payCheckField = document.getElementById("payCheck");
var payFrequencyField = document.getElementById("payFrequency");
var payDayField = document.getElementById("payDay");
var budgetLengthField = document.getElementById("budgetLength");

var expenseNameField = document.getElementById("expense1Name");
var expenseAmountField = document.getElementById("expense1Amount");
var expenseFrequencyField = document.getElementById("expense1Frequency");
var addExpenseField = document.getElementById("addExpense");

var debtNameField = document.getElementById("debt1Name");
var debtPrincipalField = document.getElementById("debt1Principal");
var debtAmountField = document.getElementById("debt1Amount");
var debtInterestField = document.getElementById("debt1InterestPercent");
var debtField = document.getElementById("addDebt");

var refreshButtonField = document.getElementById("refreshButton");

document.addEventListener("DOMContentLoaded", function() {
    BudgetTable.createTable();
    DebtTable.createTable();
});

menuField.addEventListener("click", function() {
    console.log("You Clicked the Menu!!");
});

payCheckField.addEventListener("change", function(){
    BudgetTable.createTable();
    DebtTable.createTable();
});

payFrequencyField.addEventListener("change", function(){
    budgetLengthField.value = 10;
    BudgetTable.createTable();
    DebtTable.createTable();
});

payDayField.addEventListener("change", function() {
    BudgetTable.createTable();
    DebtTable.createTable();
});

budgetLengthField.addEventListener("change", function() {
    BudgetTable.createTable();
    DebtTable.createTable();
});

expenseNameField.addEventListener("change", function() {
    BudgetTable.createTable();
    DebtTable.createTable();
});

expenseAmountField.addEventListener("change", function() {
    BudgetTable.createTable();
    DebtTable.createTable();
});

expenseFrequencyField.addEventListener("change", function(){
    if(expenseFrequencyField.value === "onceAMonth") {
        var expenseContainer = document.getElementById("expense1Container");
        var expenseDate = document.createElement("input");
        var expenseDateId = "expense1Date";
        expenseDate.id = expenseDateId;
        expenseDate.type = "number";
        expenseDate.placeholder = "Day Of Expense";
        expenseDate.addEventListener("change", function() {
            BudgetTable.createTable();
            DebtTable.createTable();
        });
        expenseContainer.appendChild(expenseDate);
    }
    else if(expenseFrequencyField.value === "onceAPaycheck") {
        var expenseContainer = document.getElementById("expense1Container");
        var expenseDate = document.getElementById("expense1Date");
        expenseContainer.removeChild(expenseDate);
    }
    BudgetTable.createTable();
    DebtTable.createTable();
});

addExpenseField.addEventListener("click", function(){
    addExpense();
})

debtNameField.addEventListener("change", function() {
    BudgetTable.createTable();
    DebtTable.createTable();
});

debtAmountField.addEventListener("change", function() {
    BudgetTable.createTable();
    DebtTable.createTable();
});

debtInterestField.addEventListener("change", function() {
    BudgetTable.createTable();
    DebtTable.createTable();
});

debtPrincipalField.addEventListener("change", function() {
    BudgetTable.createTable();
    DebtTable.createTable();
});

debtField.addEventListener("click", function(){
    addDebt();
});

refreshButtonField.addEventListener("click", function() {
    BudgetTable.createTable();
    DebtTable.createTable();
});