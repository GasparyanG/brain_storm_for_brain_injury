// Configuration
const hiddenButton = "hidden_button";
const errorMessageClass = "error_message";
const successMessageClass = "success_message";
const numberOfAllowedCharacters = 4000;

// Elements
const textArea = document.getElementById("user_message");
const sendMessageButton = document.querySelector(".send_message");
const charactersNumberElement = document.querySelector(".char_number");
const usageHintElement = document.querySelector(".usage_hint");

const errorMessages = {
    too_long : "Your message is too long.",
    something_is_wrong: "Something went wrong, please use email.",

    // Success messages
    done: "Message received."
}

function hideButton() {
    sendMessageButton.classList.add(hiddenButton);
}

function displayButton() {
    sendMessageButton.classList.remove(hiddenButton);
}

function updateCharactersLeft() {
    let numberOfChars = (numberOfAllowedCharacters - textArea.value.length);
    charactersNumberElement.textContent
        = numberOfChars < 0? 0: numberOfChars;
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
            data = JSON.parse(data);

            if (data.success)
                successMessage(errorMessages.done);
            else
                errorMessage(data.message);
        },
        error: function(e) {
            errorMessage(errorMessages.something_is_wrong);
        }
    })
}

// Events
textArea.addEventListener("input", changeButtonState);
sendMessageButton.addEventListener("click", buttonIsClicked);