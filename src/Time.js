import { Box, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
// Link to timezone: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

const Time = (props) => {
    const [ time, setTime ] = useState(new Date());

    useEffect( () => {
        setInterval( () => setTime(new Date()), 1000);
    }, []);

    let wakelockSentinel = null

    const goFullScreen = async () => {
        let timeElem = document.querySelector(`#${props.id}`);
        
        if (!document.fullscreenElement) {
            await timeElem.requestFullscreen().catch((err) => {
              console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
            });

            if ('wakeLock' in navigator) {
                wakelockSentinel = navigator.wakeLock.request('screen')
                console.log("WakeLock is active" + wakelockSentinel)
            }
          } else {
            document.exitFullscreen();
            if ('wakeLock' in navigator) {
                if (wakelockSentinel != null) {
                    await wakelockSentinel.release().then(() => {
                        wakelockSentinel = null
                    }).catch((err) => {
                        console.error(`${err.message} (${err.name})`)
                    });
                }
            }
          }
    }

    return (
        <VStack m={4} className="time" id={props.id} onClick={goFullScreen}>
            <Box fontSize="1.25rem">
                {props.description}
            </Box>
            <Box m={2} fontSize="6rem" id="clock">
                {time.toLocaleTimeString('en-GB', {hour:'numeric', minute:'numeric', second: 'numeric', timeZone:`${props.timezone}`})}
            </Box>
            <Box fontSize="1.25rem">
                {time.toLocaleDateString('en-GB', {year:'numeric', month:'long', day:'numeric', weekday:'long', timeZone:`${props.timezone}`})}
            </Box>
        </VStack>
    );
}

export default Time;