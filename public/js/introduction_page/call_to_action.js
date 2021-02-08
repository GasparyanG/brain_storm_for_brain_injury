function handleEnterEvent(e) {
    if (e.keyCode !== 13) return;
    window.location.replace("/form");
}

document.onkeyup = handleEnterEvent;