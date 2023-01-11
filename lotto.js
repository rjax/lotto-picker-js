import { start } from "./bubbles.js";
import { numberPicker } from "./picker.js";
import { subscribe, unsubscribe } from "./pubsub.js";

const container = document.querySelector("div.container");

start(container, numberPicker([1, 37], 6))
    .then((numbers) => {
        unsubscribe("picked", setPickText);
        return start(container, numberPicker([1, 7], 1));
    }).then((numbers) => {
        const element = document.querySelector("p.picks");
        element.textContent += ` | ${numbers[0]}`;
    });


subscribe("picked", setPickText);

function setPickText(data) {
    const element = document.querySelector("p.picks");
    element.textContent = `Picks: ${data.numbers.sort((a, b) => { return a - b }).join(", ")}`;
}
