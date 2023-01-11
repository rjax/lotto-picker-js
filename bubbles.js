import { subscribe } from "./pubsub.js";

const colors = ['#ed1b18', '#e38010', '#f0de16', '#a4f016', '#18d911', '#11d9c5', '#116bd9', '#1411d9', '#7f11d9', '#d911aa', '#d91139'];

function getBackgroundColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function getLeftCoordinate() {
    const max = 80;
    const min = 20;
    return `${Math.floor(Math.random() * (max - min + 1) + min)}%`;
}

function getAnimationProperties() {
    return {
        animationName: "slidein",
        animationTimingFunction: "linear",
        animationDuration: `${Math.floor(Math.random() * (10 - 6 + 1) + 6)}s`
    };
}

function getBubbleStyle() {
    const max = 80;
    const min = 20;
    return {
        left: getLeftCoordinate(),
        ...getAnimationProperties(),
        backgroundColor: getBackgroundColor(),
    };
}

function addBubble(container, picker) {

    const bubble = document.createElement("div");
    bubble.classList.add("circle");

    const style = getBubbleStyle();
    for (const property in style)
        bubble.style[property] = style[property];

    bubble.addEventListener("animationend", removeBubble)
    bubble.addEventListener("click", e => popBubble(e, picker));

    container.append(bubble);
}


function removeBubble(e) {
    e.target.remove();
}

function popBubble(e, picker) {
    picker.pick();


    e.target.remove();
}

function popBubbles() {
    document.querySelectorAll("div.circle").forEach(item => {
        item.classList.add("fadeout")
        item.removeEventListener("click", popBubble);
        item.addEventListener("transitionend", removeBubble)
        item.removeEventListener("animationend", removeBubble)

    });
}

var stop = 0;
subscribe("done", popBubbles);
subscribe("done", () => { stop = 1; clearTimeout(); });

export function start(container, picker) {
    stop = 0;
    return new Promise((resolve, reject) => {
        bubble(container, picker, resolve)
    });
};


function bubble(container, picker, resolve) {
    const minTimeout = 500;
    const maxTimeout = 1000;

    if (stop) {
        resolve(picker.numbers);
    }
    else {
        addBubble(container, picker);
        const timeout = Math.floor(Math.random() * (maxTimeout - minTimeout + 1) + minTimeout);
        setTimeout(bubble, timeout, container, picker, resolve);
    }
}

// }

