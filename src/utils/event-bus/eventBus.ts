export class EventBus<T> {
    private events: Map<string, Array<Function>>;

    constructor() {
        this.events = new Map();
    }

    public publish(name: string, event?: T): void {
        const callbacks = this.events.get(name);

        callbacks?.forEach((callback) => {
            callback(event);
        });
    }

    public subscribe(name: string, callback: Function): void {
        if (!this.events.has(name)) {
            this.events.set(name, []);
        }

        const callbacks = this.events.get(name)!;
        callbacks.push(callback);
    }

    public unsubscribe(name: string, callback: Function): void {
        const callbacks = this.events.get(name);

        if (!callbacks) {
            return;
        }

        const filtered = callbacks.filter((c) => c !== callback);
        this.events.set(name, filtered);
    }
}
