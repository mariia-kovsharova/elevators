import { LinkedList } from './linkedList';

describe('Linked List', () => {
    it('should create list 1->2->3', () => {
        const list = new LinkedList<number>();

        expect(list.size).toBe(0);
        expect(list.getHead()).toBeNull();

        list.append(1);

        expect(list.size).toBe(1);
        expect(list.getHead()).toBe(1);

        list.append(2);
        list.append(3);

        expect(list.size).toBe(3);
        expect(list.getHead()).toBe(1);
        expect(list.getTail()).toBe(3);
    });
});
