import { Box, Text, Button, ButtonGroup } from '@chakra-ui/react'
import React, { useEffect, useState, useRef, useContext } from 'react'
import {VscPlay, VscDebugPause, VscDebugRestart} from "react-icons/vsc";
import { timerProgress } from './Pomodoro';

const Timer = (props) => {
    const STATUS = {
        STARTED: "Started",
        STOPPED: "Stopped"
    };
    
    const { initialMinutes=0, initialSeconds=0 } = props;
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [status, setStatus] = useState(STATUS.STOPPED);
    const {setFinishedTimer} = useContext(timerProgress);
    
    const handleStart = () => {
        setFinishedTimer(false);
        setStatus(STATUS.STARTED);
    };
    const handleStop = () => {
        setStatus(STATUS.STOPPED);
    };
    const handleReset = () => {
        setStatus(STATUS.STOPPED);
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
    };

    // https://stackoverflow.com/a/2998874/1673761
    const twoDigits = (num) => String(num).padStart(2, "0");

    useInterval(() => {
        if (seconds === 0) {
            if (minutes > 0) {
                setMinutes(minutes-1);
                setSeconds(59);
            } else {
                setFinishedTimer(true);
                setStatus(STATUS.STOPPED);
                handleReset();
            }
        } else {
            setSeconds(seconds-1);
        }
    }, status === STATUS.STARTED ? 1000 : null);

    // source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
    function useInterval(callback, delay) {
        const savedCallback = useRef();
    
        // Remember the latest callback.
        useEffect(() => {
        savedCallback.current = callback;
        }, [callback]);
    
        // Set up the interval.
        useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
        }, [delay]);
    }

    return (
        <>
            <Box align="center">
                <Text id='countdown' p={2}>{twoDigits(minutes)}:{twoDigits(seconds)}</Text>
                <ButtonGroup>
                    <Button 
                        onClick={status===STATUS.STOPPED ? handleStart : handleStop} 
                        leftIcon={status===STATUS.STOPPED ? <VscPlay /> : <VscDebugPause />}>
                        {status===STATUS.STOPPED ? "START" : "PAUSE"}
                    </Button>

                    <Button onClick={handleReset}>{<VscDebugRestart />}</Button>
                </ButtonGroup>
            </Box> 
        </>
      )
};

export default Timer