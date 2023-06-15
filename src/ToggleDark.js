import { useColorMode, IconButton} from '@chakra-ui/react';
import React from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ToggleDark = () => {
    const {colorMode, toggleColorMode} = useColorMode()
    
    const modeLogo = () => {
        return colorMode==='light' ? <MdDarkMode /> : <MdLightMode />;
    }

    return (
       <IconButton onClick={toggleColorMode} size='md' variant='ghost' icon={modeLogo()} fontSize='24px' />
    )
};

export default ToggleDark;