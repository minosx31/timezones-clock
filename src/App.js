import { Link as ReachLink } from 'react-router-dom';
import { Button, Link, Flex, ButtonGroup } from '@chakra-ui/react'
import Time from './Time.js';
import ToggleDark from './ToggleDark.js';

function App() {

  return (
    <>
      <Flex p={2} justify="right" align="center">
        <ButtonGroup alignItems="center">
          <Link as={ReachLink} to="/pomodoro">
            <Button>Pomodoro</Button>
          </Link>

          <ToggleDark />

        </ButtonGroup>
      </Flex>

      <Flex align="center" justify="center" wrap="wrap" height="90vh">
        <Time id="time1" timezone="Singapore" description="Singapore (Local)" />

        <Time id="time2" timezone="Australia/Sydney" description="Australia (Sydney)" />

        <Time id="time3" timezone="America/New_York" description="New York (ET)" />

        <Time id="time4" timezone="Europe/London" description="London (GMT/BST)" />
      </Flex>
    </>
  );
}

export default App;
