var loginButtonField = document.getElementById("loginButton");
var createAccountButtonField = document.getElementById("createAccount");
var closeLoginModalButtonField = document.getElementById("closeLoginModalId");
var closeCreateModalButtonField = document.getElementById("closeCreateModalId");
var loginModal = document.getElementById("loginModal");
var createModal = document.getElementById("createModal");
var loginButton2Field = document.getElementById("loginButton2");
var createAccountButton2Field = document.getElementById("createAccountButton"); 

loginButtonField.addEventListener("click", function(){
    console.log("login button clicked");
    loginModal.style.display="block";
});

createAccountButtonField.addEventListener("click", function() {
    console.log("create account button clicked");
    createModal.style.display="block";
});

closeLoginModalButtonField.addEventListener("click", function() {
    loginModal.style.display="none";
});

closeCreateModalButtonField.addEventListener("click", function() {
    createModal.style.display="none";
});

loginButton2Field.addEventListener("click", function() {
    var email = document.getElementById("emailAddressField").value;
    var password = document.getElementById("passwordAddressField").value;

    console.log(email);
    console.log(password);
    var jsonObject = new Object();
    jsonObject.email = email;
    jsonObject.password = password;
    var jsonString = JSON.stringify(jsonObject);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.href = "Budgety.html";
        }
    };
    xhttp.open("POST", "https://localhost:8080/budgety/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.withCredentials = true;
    console.log(jsonString);
    xhttp.send(jsonString);
});

createAccountButton2Field.addEventListener("click", function() {
    var firstName = document.getElementById("createFirstNameField").value;
    var lastName = document.getElementById("createLastNameField").value;
    var email = document.getElementById("createEmailAddressField").value;
    var password = document.getElementById("createPasswordField").value;

    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
    var jsonObject = new Object();
    jsonObject.firstName = firstName;
    jsonObject.lastName = lastName;
    jsonObject.email = email;
    jsonObject.password = password;
    var jsonString = JSON.stringify(jsonObject);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.href = "Budgety.html";
        }
    };
    xhttp.open("POST", "https://localhost:8080/budgety/saveUser", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.withCredentials = true;
    console.log(jsonString);
    xhttp.send(jsonString);
});