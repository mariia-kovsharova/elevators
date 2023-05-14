import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FloorComponent } from './FloorComponent';

test('renders the correct floor', () => {
    const onClick = jest.fn();

    render(<FloorComponent index={1} onClick={onClick} />);

    const floorElement = screen.getByTestId('floor-item');

    expect(floorElement).toBeInTheDocument();

    fireEvent(
        floorElement,
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }),
    );

    expect(onClick).toBeCalledWith(1);
});
