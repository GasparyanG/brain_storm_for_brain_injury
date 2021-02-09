const burgerMenuIcon = document.querySelector(".burger_menu");
const navigationMenu = document.querySelector(".nav_items");

function openNavigationMenu(e) {
    navigationMenu.classList.toggle("nav_items_opened");
    if (navigationMenu.classList.contains("nav_items_opened"))
        document.body.style.setProperty("overflow-y", "hidden");
    else
        document.body.style.setProperty("overflow-y", "unset");
}

function resetToBigScreen() {
    navigationMenu.classList.remove("nav_items_opened");
    document.body.style.setProperty("overflow-y", "unset");
}

function handleMenuBar(e) {
    if (window.innerWidth > 750)
        resetToBigScreen();
}

// Add Events.
burgerMenuIcon.addEventListener("click", openNavigationMenu);
window.onresize = handleMenuBar;