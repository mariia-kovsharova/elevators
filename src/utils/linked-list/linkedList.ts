class Node<T = any> {
    public value: T;
    public next: Node<T> | null;

    constructor(value: T, next: Node<T> | null = null) {
        this.value = value;
        this.next = next;
    }

    toString(): string {
        return String(this.value);
    }
}

class LinkedList<T = any> implements Iterable<T> {
    private _head: Node<T> | null;
    private _tail: Node<T> | null;
    private _size: number;

    constructor() {
        this._head = null;
        this._tail = null;
        this._size = 0;
    }

    public get size(): number {
        return this._size;
    }

    public prepend(value: T): LinkedList<T> {
        const node = new Node(value);

        if (!this._head || !this._tail) {
            this._head = node;
            this._tail = node;
            this._size += 1;

            return this;
        }

        const currentHead = this._head;
        node.next = currentHead;

        this._head = node;
        this._size += 1;

        return this;
    }

    public append(value: T, index?: number): LinkedList<T> {
        const node = new Node(value);

        if (!this._head || !this._tail) {
            this._head = node;
            this._tail = node;
            this._size += 1;

            return this;
        }

        if (index === 0) {
            this.prepend(value);
        } else if (!index || index >= this.size || index < 0) {
            const currentTail = this._tail;
            currentTail.next = node;

            this._tail = node;
            this._size += 1;
        } else {
            let nodeAtIndex: Node<T> = this._head;

            for (let innerIndex = 0; innerIndex < index - 1; innerIndex += 1) {
                nodeAtIndex = nodeAtIndex.next as NonNullable<Node<T>>;
            }

            node.next = nodeAtIndex.next;
            nodeAtIndex.next = node;

            this._size += 1;
        }

        return this;
    }

    public deleteHead(): T | null {
        if (!this._head) {
            return null;
        }

        const value = this._head.value;

        if (this._head === this._tail) {
            this._head = this._tail = null;
            this._size = 0;
            return value;
        }

        this._head = this._head.next;
        this._size -= 1;

        return value;
    }

    public getHead(): T | null {
        return this._head?.value ?? null;
    }

    public getTail(): T | null {
        return this._tail?.value ?? null;
    }

    public *[Symbol.iterator]() {
        let node: Node<T> | null = this._head;
        while (node) {
            yield node.value;
            node = node.next;
        }
    }
}

export { LinkedList };
