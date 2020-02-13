import {capitalize} from "./Formatting.js";
import { DebtTable } from "./DebtTable.js";

var numberOfDebts = 1;

export function addDebt() {
    numberOfDebts++;
    var debtContainer = document.getElementById("debtContainer");
    var newDebtContainer = document.createElement("div");
    newDebtContainer.id = "debt" + numberOfDebts + "Container";
    newDebtContainer.appendChild(document.createTextNode("Debt #" + numberOfDebts + ": "));

    var debtName = document.createElement("input");
    debtName.id = "debt" + numberOfDebts + "Name";
    debtName.type = "text";
    debtName.placeholder = "Debt Name";
    debtName.addEventListener("change", function() {
        DebtTable.createTable();
    });
    newDebtContainer.appendChild(debtName);
    newDebtContainer.appendChild(document.createTextNode( '\u00A0' ));

    var debtPrincipal = document.createElement("input");
    debtPrincipal.id = "debt" + numberOfDebts + "Principal";
    debtPrincipal.type = "number";
    debtPrincipal.placeholder = "Principal Amount";
    debtPrincipal.addEventListener("change", function() {
        DebtTable.createTable();
    })
    newDebtContainer.appendChild(debtPrincipal);
    newDebtContainer.appendChild(document.createTextNode( '\u00A0' ));

    var debtAmount = document.createElement("input");
    debtAmount.id = "debt" + numberOfDebts + "Amount";
    debtAmount.type = "number";
    debtAmount.placeholder = "Debt Amount";
    debtAmount.addEventListener("change", function() {
        DebtTable.createTable();
    });
    newDebtContainer.appendChild(debtAmount);
    newDebtContainer.appendChild(document.createTextNode( '\u00A0' ));

    var debtInterest = document.createElement("input");
    debtInterest.id = "debt" + numberOfDebts + "InterestPercent";
    debtInterest.type = "number";
    debtInterest.placeholder = "Debt Interest %";
    debtInterest.addEventListener("change", function() {
        DebtTable.createTable();
    });
    newDebtContainer.appendChild(debtInterest);
    newDebtContainer.appendChild(document.createTextNode( '\u00A0' ));

    debtContainer.appendChild(newDebtContainer);
}