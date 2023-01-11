import { start } from "./bubbles.js";
import { numberPicker } from "./picker.js";
import { subscribe, unsubscribe } from "./pubsub.js";


export function pickNumbers(pickerContainer, card) {

    const card1 = card.querySelector("div.grid-container:first-child");
    const card2 = card.querySelector("div.grid-container:last-child");

    const setPickText1 = data => {
        if (data.backgroundColor)
            updateCard(card1, data);
        // card.textContent = `Picks: ${data.numbers.sort((a, b) => { return a - b }).join(", ")}`;
    };
    const setPickText2 = data => {
        if (data.backgroundColor)
            updateCard(card2, data);
        // card.textContent = `Picks: ${data.numbers.sort((a, b) => { return a - b }).join(", ")}`;
    };

    subscribe("picked", setPickText1);
    return new Promise((resolve, reject) => {
        start(pickerContainer, numberPicker([1, 37], 6))
            .then((numbers) => {
                unsubscribe("picked", setPickText1);
                subscribe("picked", setPickText2);
                return start(pickerContainer, numberPicker([1, 7], 1));
            }).then((numbers) => {
                // card.textContent += ` | ${numbers[0]}`;
                unsubscribe("picked", setPickText2);
                resolve();
            });

    });

}

export function createCard() {
    const card = document.createElement("p");
    card.classList.add("picks");
    return card;
}

export function createCard2() {

    const separator = document.createElement("div");
    separator.style.backgroundColor = "gray";
    separator.style.flex = "none";
    separator.style.width = "1px";

    const container = document.createElement("div");
    container.classList.add("card-container");
    container.append(createGridLayout(4, 10, 3, "grid-container", "grid-element", "grid-element"));
    container.append(separator);
    container.append(createGridLayout(4, 2, 1, "grid-container", "grid-element", "grid-element"));
    return container;
}

function updateCard(card, data) {
    const skip = parseInt(card.dataset.skip);
    const gridElement = card.querySelector(`div:nth-child(${data.value + skip})`)
    // gridElement.style.backgroundColor = data.backgroundColor;
    // const span = gridElement.querySelector("span");
    // span.style.color = data.color;
    // span.style.fontWeight = 600;

    gridElement.style.backgroundColor = "#5ec8eb";
    // const span = gridElement.querySelector("span");
    // span.style.color = data.color;
    // span.style.fontWeight = 600;

    

}

function createGridLayout(m, n, skip, containerClass, elementClass, textClass) {

    let child;
    let childSpan;
    const container = document.createElement("div");
    container.classList.add(containerClass);
    container.setAttribute("data-skip", skip.toString());

    const style = {
        gridTemplateColumns: `repeat(${n}, 30px)`
    }
    for (const property in style)
        container.style[property] = style[property];

    for (let i = 0; i < m * n; i++) {
        child = document.createElement("div");
        child.classList.add(elementClass);
        childSpan = document.createElement("span");
        if (i - skip + 1 > 0)
            childSpan.textContent = i - skip + 1;
        childSpan.classList.add(textClass);
        child.append(childSpan);
        container.append(child);
    }

    return container;
}


