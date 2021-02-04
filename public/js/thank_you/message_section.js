// Configuration
const hiddenButton = "hidden_button";
const errorMessageClass = "error_message";
const successMessageClass = "success_message";
const numberOfAllowedCharacters = 10;

// Elements
const textArea = document.getElementById("user_message");
const sendMessageButton = document.querySelector(".send_message");
const charactersNumberElement = document.querySelector(".char_number");
const usageHintElement = document.querySelector(".usage_hint");

const errorMessages = {
    too_long : "Your message is too long."
}

function hideButton() {
    sendMessageButton.classList.add(hiddenButton);
}

function displayButton() {
    sendMessageButton.classList.remove(hiddenButton);
}

function updateCharactersLeft() {
    charactersNumberElement.textContent
        = (numberOfAllowedCharacters - textArea.value.length);
}

function changeButtonState() {
    if (textAreaIsInvalid()) return;
    updateCharactersLeft();

    if (textArea.value == "")   // Empty
        hideButton();
    else
        displayButton();
}

function emptyUsageHint() {
    usageHintElement.innerHTML = "";
}

function errorMessage(message) {
    emptyUsageHint();

    let divEl = document.createElement("div");
    divEl.classList.add(errorMessageClass);
    divEl.innerText = message;

    usageHintElement.appendChild(divEl);

    setTimeout(emptyUsageHint, 5000);
}

function successMessage(message) {
    emptyUsageHint();

    let divEl = document.createElement("div");
    divEl.classList.add(successMessageClass);
    divEl.innerText = message;

    usageHintElement.appendChild(divEl);

    setTimeout(emptyUsageHint, 5000);
}

function textAreaIsInvalid() {
    if (textArea.value == "") {
        return true;
    } else if (textArea.value.length > numberOfAllowedCharacters) {
        errorMessage(errorMessages.too_long);
        return true;
    }

    return false;
}

function buttonIsClicked() {
    if (textAreaIsInvalid()) return;

    $.ajax({
        url: "/message",
        method: "POST",
        data: {message: textArea.value},
        success: function(data) {
            console.log(data);
        },
        error: function(e) {
            console.log(e);
        }
    })
}

// Events
textArea.addEventListener("input", changeButtonState);
sendMessageButton.addEventListener("click", buttonIsClicked);