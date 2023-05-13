import { LinkedList } from '../linked-list';

class Queue<T> {
    private readonly queue: LinkedList<T>;

    constructor() {
        this.queue = new LinkedList();
    }

    public get size(): number {
        return this.queue.size;
    }

    public isEmpty(): boolean {
        return this.queue.size === 0;
    }

    public enqueue(value: T): void {
        this.queue.append(value);
    }

    public dequeue(): T | null {
        return this.queue.deleteHead();
    }

    public peek(): T | null {
        return this.queue.getTail();
    }

    public *[Symbol.iterator]() {
        for (const item of this.queue) {
            yield item;
        }
    }
}

export { Queue };
