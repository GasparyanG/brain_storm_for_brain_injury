// CSS Classes
const videoTranslatedClass = "video-translated";
const mainVideoClass = "main-video";
const extraLayerClass = "extra-layer";
const videoWrapperClass = "video-wrapper";

// Getting Elements
const videos = document.querySelectorAll("." + videoTranslatedClass);

function prepareSecondaryInnerContent(secondary, Iframe) {
    let div = document.createElement("div");
    div.classList.add(extraLayerClass);

    const videoWrapper = secondary.querySelector("." + videoWrapperClass);

    videoWrapper.innerHTML = "";
    videoWrapper.appendChild(div);
    videoWrapper.appendChild(Iframe);
}

function swapVideos(secondary, primary) {
    let primaryIFrame = primary.querySelector("iframe");
    primaryIFrame = primaryIFrame.cloneNode(true);
    console.log(primaryIFrame);

    let secondaryIFrame = secondary.querySelector("iframe");

    primary.innerHTML = "";
    primary.appendChild(secondaryIFrame);
    prepareSecondaryInnerContent(secondary, primaryIFrame);

}

function changeToMain(e) {
    let element = e.target.parentNode.parentNode;
    if (!element.classList.contains(videoTranslatedClass)) return;
    const mainVideoElement = document.querySelector("." + mainVideoClass);

    swapVideos(element, mainVideoElement);
}

function addEvents() {
    for(let i = 0; i < videos.length; i++) {
        videos[i].addEventListener("click", changeToMain);
    }
}

addEvents();