import { House } from '../domain/entities/house/House';

export const callElevatorUseCase = (house: House, floor: number): void => {
    house.callElevatorToTheFloor(floor);
};
