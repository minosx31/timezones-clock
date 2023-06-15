import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import theme from './theme';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { HashRouter, Routes, Route} from 'react-router-dom';
import Pomodoro from './Pomodoro';
import MinutesContext from './MinutesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <MinutesContext>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
        </Routes> 
      </MinutesContext>
    </ChakraProvider>
  </HashRouter>
);
