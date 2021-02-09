const emailInputField = document.getElementById("email");
const actionBox = document.querySelector(".action_box");
const notificationBox = document.querySelector(".notification_box");
const notificationAndAction = document.querySelector(".notification_and_action");

// CONFIGURATIONS
const EmailMessages = {
    email_wrong_format: "Wrong email format",
    success: "Got it!",
}

const actionBoxIsDisabled = "action_box_disabled";

// Helper functions.
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// DOM Manipulation Functions.
function clearNotificationContainer() {
    notificationBox.innerHTML = "";
}

function reverseOrder() {
    if(actionBox.classList.contains(actionBoxIsDisabled))
        notificationAndAction.style.setProperty("flex-direction", "column-reverse");
    else
        notificationAndAction.style.setProperty("flex-direction", "row");
}

function displayEmailSendButton() {
    actionBox.classList.remove(actionBoxIsDisabled);
}

function hideEmailSendButton() {
    actionBox.classList.add(actionBoxIsDisabled);
}

function displayEmailError(message) {
    let divElement = document.createElement("div");
    divElement.classList.add("error_message");
    divElement.textContent = message;

    // Add to notification container.
    clearNotificationContainer();
    notificationBox.appendChild(divElement);
}

function displayEmailSuccess(message) {
    let divElement = document.createElement("div");
    divElement.classList.add("success_message");
    divElement.textContent = message;

    // Add to notification container.
    clearNotificationContainer();
    notificationBox.appendChild(divElement);
}

// TODO: Notify the user about verification urgency.
function displayEmailInformation(message) {

}

function validMeasures() {
    displayEmailSendButton();                                           // Display button.
    clearNotificationContainer();                                       // Remove error message.
}

function invalidMeasures() {
    hideEmailSendButton();                                              // Hide button.
    displayEmailError(EmailMessages.email_wrong_format);                // Display error.
}

// Functions to Handle Events.
function emailValidation(e) {
    if (e.target.value === "") clearNotificationContainer();
    else if (validateEmail(e.target.value)) validMeasures();
    else invalidMeasures();

    reverseOrder();
}


function sendEmail(e) {
    if (e.keyCode !== 13) return;
    if (!validateEmail(e.target.value)) invalidMeasures();

    // Send Ajax POST Request.
}

// Adding events.
emailInputField.addEventListener("input", emailValidation);
emailInputField.addEventListener("keyup", sendEmail);