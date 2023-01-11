import { publish, subscribe } from "./pubsub.js";

export function numberPicker(numberRange, pickCount) {

    const numbers = [];
    const min = numberRange[0];
    const max = numberRange[1];
    const maxNumbers = pickCount;
    const candidates = Array.from({ length: max - min + 1 }, (element, index) => index + 1);
    const candidatesCount = candidates.length;

    return {
        pick() {
            let values;
            if (candidates.length > candidatesCount - maxNumbers) {
                const index = Math.floor(Math.random() * candidates.length);
                values = candidates.splice(index, 1);
            }

            if (values && values.length === 1) {

                numbers.push(values[0]);

                const data = { value: values[0], numbers };
                publish("picked", data);

                if (numbers.length === pickCount)
                    publish("done", data);

            }
        },
        numbers
    };
}