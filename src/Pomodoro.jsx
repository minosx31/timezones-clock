import { Button, Container, Flex, Link, ButtonGroup, Tabs, TabList, Tab, TabPanel, TabPanels, Text, Center, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure } from '@chakra-ui/react'
import { ImHome } from "react-icons/im";
import React, { createContext, useEffect, useState } from 'react'
import { Link as ReachLink } from 'react-router-dom';
import ToggleDark from './ToggleDark.jsx';
import Settings from './Settings.jsx';
import Timer from './Timer.jsx'
import { MinutesState } from './MinutesContext.jsx';

export const timerProgress = createContext();

if (!localStorage.getItem('count')) {
    localStorage.setItem('count', 0);
}

const Pomodoro = () => {
    const [ finishedTimer, setFinishedTimer ] = useState(false);
    const [ finishedCount, setFinishedCount ] = useState(0);
    const [ selected, setSelected ] = useState(0);
    const [ currentTimer, setCurrentTimer ] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef()

    const {
        currentPomodoroMinutes,
        currentShortBreakMinutes,
        currentLongBreakMinutes
    } = MinutesState();
    
    useEffect(() => {
        let currentMinutes;
        let currentSeconds;
        switch(selected) {
            case 0:
                currentMinutes = currentPomodoroMinutes < 1 ? 0 : currentPomodoroMinutes;
                currentSeconds = currentPomodoroMinutes < 1 ? currentPomodoroMinutes * 60 : 0;
                setCurrentTimer(<Timer initialMinutes={currentMinutes} initialSeconds={currentSeconds} key={currentPomodoroMinutes} />)
                break;
            case 1:
                currentMinutes = currentShortBreakMinutes < 1 ? 0 : currentShortBreakMinutes;
                currentSeconds = currentShortBreakMinutes < 1 ? currentShortBreakMinutes * 60 : 0;
                setCurrentTimer(<Timer initialMinutes={currentMinutes} initialSeconds={currentSeconds} key={currentShortBreakMinutes} />)
                break;
            case 2:
                currentMinutes = currentLongBreakMinutes < 1 ? 0 : currentLongBreakMinutes;
                currentSeconds = currentLongBreakMinutes < 1 ? currentLongBreakMinutes * 60 : 0;
                setCurrentTimer(<Timer initialMinutes={currentMinutes} initialSeconds={currentSeconds} key={currentLongBreakMinutes} />)
                break;
            default:
        }
    }, [selected, currentPomodoroMinutes, currentShortBreakMinutes, currentLongBreakMinutes])

    useEffect(() => {
        if (finishedCount > 0) {
            if (finishedCount%2 === 0) {
                setSelected(2); // set Long Break timer
            } else {
                setSelected(1); // set Short Break timer
            }
        } else {
            setSelected(0);
        }
        localStorage.setItem('count', finishedCount)
    }, [finishedCount])

    useEffect(() => {
        if (finishedTimer === true) {
            if (selected === 0) {
                setFinishedCount(finishedCount + 1)
            } else {
                setSelected(0);
            }
        }
        // eslint-disable-next-line
    }, [finishedTimer])

  return (
    <timerProgress.Provider value={{finishedTimer, setFinishedTimer}}>
        <Flex p={2} justify="right">
            <ButtonGroup spacing='2'>
                <Link as={ReachLink} to="/">
                    <Button leftIcon={<ImHome />}>Home</Button>
                </Link>
                <Settings />
                <ToggleDark />
            </ButtonGroup>
        </Flex>

        <Container display="flex" alignItems="center" p={4} size='lg' centerContent>
            <Tabs align="center" variant="solid-rounded" onChange={(index) => {setSelected(index)}} index={selected}>
                <TabList>
                    <Tab>Pomodoro</Tab>
                    <Tab>Short Break</Tab>
                    <Tab>Long Break</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        {currentTimer}
                    </TabPanel>

                    <TabPanel>
                        {currentTimer}
                    </TabPanel>

                    <TabPanel>
                        {currentTimer}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>

        <Center>
            <Text fontSize='3xl' onClick={onOpen} style={{cursor: 'pointer'}}>
                #{finishedCount}
            </Text>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Reset Pomodoro Count
                </AlertDialogHeader>
    
                <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>
    
                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme='red' onClick={() => {setFinishedCount(0); onClose();}} ml={3}>
                    Reset
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </Center>
        
    </timerProgress.Provider>
  )
};

export default Pomodoro