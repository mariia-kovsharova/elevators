import { Elevator } from './Elevator';

describe('Elevator', () => {
    it('should be created', () => {
        const elevator = new Elevator(10);
        expect(elevator).toBeTruthy();
        expect(elevator.floor).toBe(1);
        expect(elevator.isMoving).toBe(false);
    });

    it('should get the moving task', async () => {
        const elevator = new Elevator(10);
        expect(elevator.floor).toBe(1);
        expect(elevator.isMoving).toBe(false);

        elevator.call(10, 2000);
        expect(elevator.isMoving).toBe(true);

        await new Promise<void>((res) => {
            setTimeout(() => {
                res();
            }, 2000);
        });

        expect(elevator.floor).toBe(10);
        expect(elevator.isMoving).toBe(false);
    });
});
