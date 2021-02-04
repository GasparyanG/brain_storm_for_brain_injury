// Configuration
const hiddenButton = "hidden_button";
const numberOfAllowedCharacters = 5000;

// Elements
const textArea = document.getElementById("user_message");
const sendMessageButton = document.querySelector(".send_message");
const charactersNumberElement = document.querySelector(".char_number");

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
    updateCharactersLeft();

    if (textArea.value == "")   // Empty
        hideButton();
    else
        displayButton();
}

function buttonIsClicked() {
    if(textArea.value == "") return;

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