import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Box, Text, HStack } from '@chakra-ui/react'
import { FiSettings } from 'react-icons/fi'
import React from 'react'
import { MinutesState } from './MinutesContext';

const Settings = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {
        currentPomodoroMinutes, setCurrentPomodoroMinutes, 
        currentShortBreakMinutes, setCurrentShortBreakMinutes, 
        currentLongBreakMinutes, setCurrentLongBreakMinutes 
    } = MinutesState();

    function updateTimeState() {
        localStorage.setItem("pomodoro", currentPomodoroMinutes);
        localStorage.setItem("short-break", currentShortBreakMinutes);
        localStorage.setItem("long-break", currentLongBreakMinutes);
    }

    return (
        <>
            <Button leftIcon={<FiSettings />} onClick={onOpen}>
                Settings
            </Button>

            <Modal isOpen={isOpen} onClose={ () => { onClose(); updateTimeState();}} scrollBehavior='outside'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Settings</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Stack direction="row" p="2">
                            <Box>
                                <Text as='b'>Pomodoro</Text>
                                <NumberInput onChange={(e) => setCurrentPomodoroMinutes(e)} 
                                clampValueOnBlur={true} 
                                step={1} 
                                defaultValue={currentPomodoroMinutes}
                                min={0}
                                max={60}
                                allowMouseWheel
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Box>
                            
                            <Box>
                                <Text as='b'>Short Break</Text>
                                <NumberInput 
                                onChange={(e) => setCurrentShortBreakMinutes(e)} 
                                clampValueOnBlur={true} 
                                tep={1} 
                                defaultValue={currentShortBreakMinutes} 
                                min={0} 
                                max={15} 
                                allowMouseWheel
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Box>

                            <Box>
                                <Text as='b'>Long Break</Text>
                                <NumberInput onChange={(e) => setCurrentLongBreakMinutes(e)} 
                                clampValueOnBlur={true} 
                                step={1} 
                                defaultValue={currentLongBreakMinutes} 
                                min={0} 
                                max={30} 
                                allowMouseWheel
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Box>
                        </Stack>

                        <HStack p="2" display="flex" justify="space-between"> 
                            <Text>Long Break Interval</Text>
                            <NumberInput w="32%">
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </HStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={1} onClick={() => {onClose(); updateTimeState();}}>
                            Ok
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </> 
    )
}

export default Settings