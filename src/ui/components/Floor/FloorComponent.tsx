import './FloorComponent.scss';

interface FloorComponentProps {
    index: number;
    onClick: (index: number) => void;
}

export const FloorComponent = ({ index, onClick }: FloorComponentProps) => {
    return (
        <div
            className='floor_container__item'
            data-testid='floor-item'
            onClick={() => onClick(index)}
        ></div>
    );
};
