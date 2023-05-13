import {
    ChakraProvider,
    Container,
    FormControl,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { HouseComponent, HouseComponentProps } from './ui/components/House/House';

const DEFAULT_SPEED = 1000;

const VALIDATION = {
    floors: {
        min: 3,
    },
    elevators: {
        min: 1,
        max: 9,
    },
    speed: {
        min: 1,
    },
};

function App() {
    const [config, setConfig] = useState<HouseComponentProps>({
        floorsCount: 7,
        elevatorsCount: 1,
        elevatorsSpeed: 1,
    });

    const handleFloorChange = (_: string, value: number): void => {
        setConfig((prev) => {
            if (value < VALIDATION.floors.min) {
                return prev;
            }

            return { ...prev, floorsCount: value };
        });
    };

    const handleElevatorsChange = (_: string, value: number): void => {
        setConfig((prev) => {
            if (value < VALIDATION.elevators.min || value > VALIDATION.elevators.max) {
                return prev;
            }

            return { ...prev, elevatorsCount: value };
        });
    };

    const handleElevatorSpeedChange = (_: string, value: number): void => {
        setConfig((prev) => {
            if (value < VALIDATION.speed.min) {
                return prev;
            }

            return { ...prev, elevatorsSpeed: value };
        });
    };

    const isFloorsCountInvalid = config.floorsCount < VALIDATION.floors.min;
    const isElevatorsCountInvalid =
        config.elevatorsCount < VALIDATION.elevators.min ||
        config.elevatorsCount > VALIDATION.elevators.max;

    const isElevatorsSpeedInvalid = (config.elevatorsSpeed ?? DEFAULT_SPEED) < VALIDATION.speed.min;

    return (
        <ChakraProvider>
            <VStack>
                <Container maxW='3xl'>
                    <>
                        <FormControl isInvalid={isFloorsCountInvalid}>
                            <FormLabel>Input floors count:</FormLabel>
                            <NumberInput
                                value={config.floorsCount}
                                onChange={handleFloorChange}
                                min={3}
                                keepWithinRange={false}
                                clampValueOnBlur={false}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl isInvalid={isElevatorsCountInvalid}>
                            <FormLabel>Input elevators count:</FormLabel>
                            <NumberInput
                                value={config.elevatorsCount}
                                onChange={handleElevatorsChange}
                                min={VALIDATION.elevators.min}
                                max={VALIDATION.elevators.max}
                                keepWithinRange={false}
                                clampValueOnBlur={false}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl isInvalid={isElevatorsSpeedInvalid}>
                            <FormLabel>
                                Input elevators speed (optional, time for passing 1 floor, in sec):
                            </FormLabel>
                            <NumberInput
                                value={config.elevatorsSpeed}
                                onChange={handleElevatorSpeedChange}
                                min={VALIDATION.speed.min}
                                keepWithinRange={false}
                                clampValueOnBlur={false}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </>
                </Container>
                <Container maxW='3xl' padding='20px'>
                    <HouseComponent {...config}></HouseComponent>
                </Container>
            </VStack>
        </ChakraProvider>
    );
}

export default App;
