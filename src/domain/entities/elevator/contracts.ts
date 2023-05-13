export enum ElevatorState {
    Stopped = 'STOPPED',
    MovingUp = 'MOVING_UP',
    MovingDown = 'MOVING_DOWN',
}

export interface IElevatorState {
    state: ElevatorState;
    currentFloor: number;
    targetFloor: number;
    time: number;
    id: string;
}
