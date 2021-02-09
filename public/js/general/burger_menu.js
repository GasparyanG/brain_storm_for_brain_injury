const burgerMenuIcon = document.querySelector(".burger_menu");
const navigationMenu = document.querySelector(".nav_items");

function openNavigationMenu(e) {
    navigationMenu.classList.add("nav_items_opened");
}


// Add Events.
burgerMenuIcon.addEventListener("click", openNavigationMenu);