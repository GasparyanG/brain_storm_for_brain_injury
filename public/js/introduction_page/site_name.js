const siteNameLetters = document.querySelectorAll(".site_name_letter");

function translateLetters() {
    for (let i = 0; i < siteNameLetters.length; i++)
        siteNameLetters[i].classList.remove("site_name_letter_translated");
}

translateLetters();