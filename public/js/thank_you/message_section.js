// Configuration
const hiddenButton = "hidden_button";

// Elements
const textArea = document.getElementById("user_message");
const sendMessageButton = document.querySelector(".send_message");

function hideButton() {
    sendMessageButton.classList.add(hiddenButton);
}

function displayButton() {
    sendMessageButton.classList.remove(hiddenButton);
}

function changeButtonState() {
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