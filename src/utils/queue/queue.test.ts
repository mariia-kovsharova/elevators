import { Queue } from './queue';

describe('Queue', () => {
    it('[1,2,3,4,5] should work correctly', () => {
        const queue = new Queue<number>();

        expect(queue.size).toBe(0);
        expect(queue.isEmpty()).toBeTruthy();

        queue.enqueue(1);
        queue.enqueue(2);

        expect(queue.size).toBe(2);
        expect(queue.isEmpty()).toBeFalsy();
        expect(queue.peek()).toBe(2);

        queue.enqueue(3);
        queue.enqueue(4);
        queue.enqueue(5);

        expect(queue.size).toBe(5);
        expect(queue.isEmpty()).toBeFalsy();
        expect(queue.peek()).toBe(5);
    });
});
