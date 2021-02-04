// Configuration
const disableBackgroundImage = "disable_background_image";
const darkBackgroundTheme = "dark_background";
const lightBackgroundTheme = "light_background";
const shufflingTimout = 5000;

const backgroundElements = document.querySelectorAll(".background_image");
const siteNameAndDescription = document.querySelector(".site_name_and_description");
var currentBackgroundElementIndex = 0;
var currentBackgroundElement = null;

function shuffle() {
    if (currentBackgroundElement === null) {
        currentBackgroundElement = backgroundElements[currentBackgroundElementIndex];
        currentBackgroundElement.classList.remove(disableBackgroundImage);
        changeTheme();

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
    changeTheme();

    // Advance.
    currentBackgroundElementIndex++;
}

function currentBckIndex() {
    if (currentBackgroundElementIndex >= backgroundElements.length) {
        currentBackgroundElementIndex = 0;  // Resetting
    }

    return currentBackgroundElementIndex;
}

function changeTheme() {
    if (currentBackgroundElement.classList.contains(darkBackgroundTheme)){
        siteNameAndDescription.classList.add(darkBackgroundTheme);
        siteNameAndDescription.classList.remove(lightBackgroundTheme);
    } else {
        siteNameAndDescription.classList.add(lightBackgroundTheme);
        siteNameAndDescription.classList.remove(darkBackgroundTheme);
    }
}

shuffle();  // Initial background.

setInterval(shuffle, shufflingTimout);
