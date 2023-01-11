const subscribers = {};

export function publish(event, data) {
    if (!subscribers[event])
        return;

    subscribers[event].forEach(subscriberCallback => subscriberCallback(data));
}

export function subscribe(event, callback) {
    let index;

    if (!subscribers[event]) {
        subscribers[event] = [];
    }

    index = subscribers[event].push(callback) - 1;

    return {
        unsubscribe() {
            subscribers[event].splice(index, 1);
        }
    };
}

export function unsubscribe(event, callback) {
    const index = subscribers[event].findIndex(f => f.name === callback.name)
    if (index >= 0)
        subscribers[event].splice(index, 1);
}

