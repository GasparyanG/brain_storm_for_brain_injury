function pageAnimationStopper()
{
    let body = document.querySelector("body");
    body.classList.add("page_animation_stopper");

    setTimeout(() => body.classList.remove("page_animation_stopper"), 400);
}

window.addEventListener("resize", pageAnimationStopper);