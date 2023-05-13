import { useEffect, useState } from 'react';
import { Elevator } from '../domain/entities/elevator/Elevator';
import { IElevatorState } from '../domain/entities/elevator/contracts';

export const useElevatorState = (elevator: Readonly<Elevator>) => {
    const [elevatorState, setElevatorState] = useState<IElevatorState | null>(null);

    useEffect(() => {
        const listener = (updatedState: IElevatorState) => {
            setElevatorState(updatedState);
        };

        elevator.registerListener(listener);

        return () => {
            elevator.unregisterListener(listener);
        };
    }, [elevator]);

    return { elevatorState };
};
