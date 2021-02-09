const emailInputField = document.getElementById("email");

// Helper functions.
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// DOM Manipulation Functions.
function displayEmailSendButton() {

}

function hideEmailSendButton() {

}

function displayEmailError(message) {

}

function displayEmailSuccess(message) {

}

function displayEmailInformation(message) {

}

// Functions to Handle Events.
function emailValidation(e) {
    if (validateEmail(e.target.value)) console.log("valid!");
    else console.log("invalid!");
}


function sendEmail(e) {
    if (e.keyCode !== 13) return;
    console.log(e.target.value);
}

// Adding events.
emailInputField.addEventListener("input", emailValidation);
emailInputField.addEventListener("keyup", sendEmail);