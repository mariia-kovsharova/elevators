import { useCallback } from 'react';
import { House } from '../../../domain/entities/house/House';
import { callElevatorUseCase } from '../../../primary/callElevatorUseCase';
import { ElevatorComponent } from '../Elevator/Elevator';
import { FloorComponent } from '../Floor/FloorComponent';
import './HouseComponent.scss';

export interface HouseComponentProps {
    floorsCount: number;
    elevatorsCount: number;
    elevatorsSpeed: number;
}

export const HouseComponent = ({
    floorsCount,
    elevatorsCount,
    elevatorsSpeed,
}: HouseComponentProps) => {
    const speed = elevatorsSpeed * 1000;

    const house = new House(
        House.WithFloors(floorsCount),
        House.WithElevators(elevatorsCount, speed),
    );

    const handleFloorClick = useCallback(
        (index: number) => {
            callElevatorUseCase(house, index);
        },
        [floorsCount, elevatorsCount, elevatorsSpeed],
    );

    const floors = [...new Array(floorsCount)].map((_, index) => {
        const floor = floorsCount - index;
        return (
            <div key={floor} className='floor_container'>
                <div className='floor_container__index'>{floor}</div>
                <FloorComponent index={floor} onClick={handleFloorClick} />
            </div>
        );
    });

    const step = 100 / floorsCount;

    const elevators = house.elevatorsData.map((elevator) => (
        <ElevatorComponent key={elevator.id} elevator={elevator} step={step}></ElevatorComponent>
    ));

    return (
        <div className='house_container'>
            <div className='house_container__elevators'>{elevators}</div>
            <div className='house_container__floors'>{floors}</div>
        </div>
    );
};
