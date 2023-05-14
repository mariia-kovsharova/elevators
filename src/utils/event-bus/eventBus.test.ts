import { EventBus } from './eventBus';

describe('EventBus', () => {
    it('should work correctly', () => {
        const eventBus = new EventBus();
        const name = 'name';

        const callback = jest.fn();

        eventBus.subscribe(name, callback);
        eventBus.publish(name);

        expect(callback).toBeCalled();
    });
});
