import { Queue } from '../../../utils/queue';
import { Elevator } from '../elevator/Elevator';

type HouseOption = (h: House) => void;

const DEFAULT_FLOORS_COUNT = 3;
const WAIT_TIME = 1000;

export class House {
    private floors: number;
    private elevators: ReadonlyArray<Elevator>;
    private readonly queue: Queue<number>;

    constructor(...options: Array<HouseOption>) {
        this.floors = DEFAULT_FLOORS_COUNT;
        this.elevators = [];
        this.queue = new Queue();

        options.forEach((option) => {
            option(this);
        });
    }

    static WithFloors(count: number): HouseOption {
        if (count < 2) {
            throw new Error('Count of floors has to be more than 2');
        }

        return (h: House): void => {
            h.floors = count;
        };
    }

    static WithElevators(count: number, speed: number): HouseOption {
        if (count < 1) {
            throw new Error('Count of elevators has to be more than 1');
        }

        if (speed && speed <= 0) {
            throw new Error('Speed can not be less or equal 0');
        }

        return (h: House): void => {
            h.elevators = [...new Array(count)].map(() => new Elevator(speed));
        };
    }

    public get elevatorsData(): ReadonlyArray<Readonly<Elevator>> {
        return this.elevators;
    }

    public callElevatorToTheFloor(floor: number): void {
        if (floor > this.floors || floor < 1) {
            throw new Error("You can't call the elevator to this floor");
        }

        this.queue.enqueue(floor);
        this.processQueue();
    }

    private calculateNeededTime(elevator: Elevator, target: number): number {
        const current = elevator.floor;
        const delta = Math.abs(current - target);
        return delta * elevator.speed;
    }

    private processQueue(): void {
        if (this.queue.isEmpty()) {
            return;
        }

        const freeElevators = this.elevators.filter((e: Elevator) => !e.isMoving);

        if (!freeElevators.length) {
            setTimeout(() => {
                this.processQueue();
            }, WAIT_TIME);

            return;
        }

        const floor = this.queue.dequeue()!;

        console.log('Looking for the best elevator...');

        let lowestTime = Infinity;
        let [fastestElevator] = freeElevators;

        for (const elevator of freeElevators) {
            const time = this.calculateNeededTime(elevator, floor);
            if (lowestTime > time) {
                lowestTime = time;
                fastestElevator = elevator;
            }
        }

        fastestElevator.call(floor, lowestTime);
    }
}
