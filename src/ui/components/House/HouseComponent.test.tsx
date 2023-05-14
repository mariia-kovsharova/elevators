import React from 'react';
import { render, screen } from '@testing-library/react';
import { HouseComponent } from './HouseComponent';

test('renders the correct floor', () => {
    const params = {
        floorsCount: 3,
        elevatorsCount: 1,
        elevatorsSpeed: 1,
    };

    render(<HouseComponent {...params} />);

    const floorElements = screen.getAllByTestId('floor-item');
    const elevatorElements = screen.getAllByTestId('elevator');

    expect(floorElements.length).toBe(params.floorsCount);
    expect(elevatorElements.length).toBe(params.elevatorsCount);
});
