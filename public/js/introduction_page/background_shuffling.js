// Configuration
const disableBackgroundImage = "disable_background_image";
const shufflingTimout = 5000;

const backgroundElements = document.querySelectorAll(".background_image");
var currentBackgroundElementIndex = 0;
var currentBackgroundElement = null;

function shuffle() {
    if (currentBackgroundElement === null) {
        currentBackgroundElement = backgroundElements[currentBackgroundElementIndex];
        currentBackgroundElement.classList.remove(disableBackgroundImage);

        // Advance.
        currentBackgroundElementIndex++;
        return;
    }

    // Disable current background.
    currentBackgroundElement.classList.add(disableBackgroundImage);

    // Set current background to the next element.
    currentBackgroundElement = backgroundElements[currentBckIndex()];

    // Enable current background element.
    currentBackgroundElement.classList.remove(disableBackgroundImage);

    // Advance.
    currentBackgroundElementIndex++;
}

function currentBckIndex() {
    if (currentBackgroundElementIndex >= backgroundElements.length) {
        currentBackgroundElementIndex = 0;  // Resetting
    }

    return currentBackgroundElementIndex;
}

shuffle();  // Initial background.

setInterval(shuffle, shufflingTimout);
