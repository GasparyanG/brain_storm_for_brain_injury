const emailInputField = document.getElementById("email");
const actionBox = document.querySelector(".action_box");
const notificationBox = document.querySelector(".notification_box");
const notificationAndAction = document.querySelector(".notification_and_action");
const emailButton = document.querySelector(".email_button");

// CONFIGURATIONS
const EmailMessages = {
    email_wrong_format: "Wrong email format",
    success: "Thank You! Now you will get a message to verify your email.",
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

function invalidMeasures(isMessage = false, message = "") {
    hideEmailSendButton();                                              // Hide button.

    if (!isMessage)
        displayEmailError(EmailMessages.email_wrong_format);            // Display error.
    else
        displayEmailError(message);
}

// Functions to Handle Events.
function emailValidation(e) {
    if (e.target.value === "") clearNotificationContainer();
    else if (validateEmail(e.target.value)) validMeasures();
    else invalidMeasures();

    reverseOrder();
}

function handleEnterKeyForEmail(e) {
    if (e.keyCode !== 13) return;
    sendEmail(e);
}

function sendEmail(e) {
    if (!validateEmail(emailInputField.value)) invalidMeasures();

    let emailData = {"email" : emailInputField.value};

    $.ajax({
        url: "/email_verification",
        method: "POST",
        data: JSON.stringify(emailData),
        success: function (data) {
            data = JSON.parse(data);

            if (data.success) {
                validMeasures();
                displayEmailSuccess(EmailMessages.success);
            } else {
                invalidMeasures(true, data.message);
                reverseOrder();
            }
        },
        error: function (err) {
            console.error(err);
        }
    })
}

// Adding Events
emailInputField.addEventListener("input", emailValidation);
emailInputField.addEventListener("keyup", handleEnterKeyForEmail);
emailButton.addEventListener("click", sendEmail);