import { Image } from '@chakra-ui/react';

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Elevator } from '../../../domain/entities/elevator/Elevator';
import { ElevatorState } from '../../../domain/entities/elevator/contracts';
import { useElevatorState } from '../../../secondary/useElevatorState';
import './Elevator.scss';

interface ElevatorComponentProps {
    elevator: Readonly<Elevator>;
    step: number;
}

export const ElevatorComponent = ({ elevator, step }: ElevatorComponentProps) => {
    const { elevatorState } = useElevatorState(elevator);
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        const animation = (elevatorState && elevatorState.state !== ElevatorState.Stopped) ?? false;
        setIsAnimated(animation);
    }, [elevatorState]);

    const names = classNames('elevator_container__item', {
        animated: isAnimated,
    });

    const bottomPosition = (elevator.floor - 1) * step;
    const isMovingUp = elevatorState?.state === ElevatorState.MovingUp;

    let containerStyles: Record<string, string> = {
        bottom: `${bottomPosition}%`,
    };

    const delta =
        isAnimated && Math.abs(elevatorState!.currentFloor - elevatorState!.targetFloor) * 100;

    if (isAnimated) {
        containerStyles = {
            ...containerStyles,
            bottom: `${bottomPosition}%`,
            transform: `translateY(${isMovingUp ? '-' : ''}${delta}%)`,
            transition: `transform ${elevatorState!.time}ms ease-in-out`,
        };
    }

    return (
        <div className='elevator_container' data-testid='elevator'>
            <div className={names} style={containerStyles}>
                <Image
                    height='100px'
                    width='70px'
                    src='./elevator.png'
                    alt={`Elevator-${elevator.id}`}
                />
            </div>
        </div>
    );
};
