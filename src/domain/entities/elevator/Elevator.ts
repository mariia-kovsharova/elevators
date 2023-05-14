import { v4 as uuid } from 'uuid';
import { EventBus } from '../../../utils/event-bus';
import { ElevatorState, IElevatorState } from './contracts';

const FIRST_FLOOR = 1;

export class Elevator {
    private readonly eventBus: EventBus<IElevatorState>;
    private readonly eventName: string;
    private state: ElevatorState;
    private currentFloor: number;

    public readonly id: string;
    public readonly speed: number;

    constructor(speed: number) {
        this.eventBus = new EventBus();
        this.state = ElevatorState.Stopped;
        this.currentFloor = FIRST_FLOOR;

        this.id = uuid();
        this.speed = speed;

        this.eventName = `Event-${this.id}`;
    }

    public get floor(): number {
        return this.currentFloor;
    }

    public get isMoving(): boolean {
        return this.state !== ElevatorState.Stopped;
    }

    public registerListener(callback: Function): void {
        this.eventBus.subscribe(this.eventName, callback);
    }

    public unregisterListener(callback: Function): void {
        this.eventBus.unsubscribe(this.eventName, callback);
    }

    public call(targetFloor: number, time: number): void {
        if (this.currentFloor === targetFloor) {
            return;
        }

        this.state =
            this.currentFloor < targetFloor ? ElevatorState.MovingUp : ElevatorState.MovingDown;

        const event: IElevatorState = {
            state: this.state,
            currentFloor: this.currentFloor,
            targetFloor: targetFloor,
            time,
            id: this.id,
        };

        this.eventBus.publish(this.eventName, event);

        setTimeout(() => {
            this.state = ElevatorState.Stopped;
            this.currentFloor = targetFloor;

            const event: IElevatorState = {
                state: this.state,
                currentFloor: this.currentFloor,
                targetFloor: this.currentFloor,
                time: 0,
                id: this.id,
            };

            this.eventBus.publish(this.eventName, event);

            console.log(`The elevator ${this.id} has arrived to the floor ${targetFloor}`);
        }, time);

        console.log(
            `The elevator ${this.id} starts ${this.state} to the floor ${targetFloor}, expected time: ${time}`,
        );
    }
}
