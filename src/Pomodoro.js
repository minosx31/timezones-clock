import { Button, Container, Flex, Link, ButtonGroup, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import { ImHome } from "react-icons/im";
import React, { createContext, useEffect, useState } from 'react'
import { Link as ReachLink } from 'react-router-dom';
import ToggleDark from './ToggleDark.js';
import Settings from './Settings.js';
import Timer from './Timer.js'
import { MinutesState } from './MinutesContext.js';

export const timerProgress = createContext();

const Pomodoro = () => {
    const [finishedTimer, setFinishedTimer] = useState(false);
    const [ finishedCount, setFinishedCount ] = useState(0);

    const {
        currentPomodoroMinutes,
        currentShortBreakMinutes,
        currentLongBreakMinutes
    } = MinutesState();

    const [selected, setSelected] = useState(0);

    const [currentTimer, setCurrentTimer] = useState()

    useEffect( () => {
        switch(selected) {
            case 0:
                setCurrentTimer(<Timer initialMinutes={currentPomodoroMinutes} key={currentPomodoroMinutes} />)
                break;
            case 1:
                setCurrentTimer(<Timer initialMinutes={currentShortBreakMinutes} key={currentShortBreakMinutes} />)
                break;
            case 2:
                setCurrentTimer(<Timer initialMinutes={currentLongBreakMinutes} key={currentLongBreakMinutes} />)
                break;
            default:
        }
    }, [selected, currentPomodoroMinutes, currentShortBreakMinutes, currentLongBreakMinutes])

    useEffect(() => {
        if (finishedTimer === true) {
            if (selected === 0) {
                if (finishedCount > 0 && finishedCount&2==0) {
                    setSelected(2); // set Long Break timer
                } else {
                    setSelected(1); // set Short Break timer
                }
            } else {
                setSelected(0);
            }
        }
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
    </timerProgress.Provider>
  )
};

export default Pomodoro