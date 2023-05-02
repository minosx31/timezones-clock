import React, { useState, useEffect } from 'react';

const ToggleDark = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const body = document.body
        const toggle = document.querySelector('#toggle-dark-inner')

        if (isDarkMode === true) {
          body.classList.add('dark-mode')
          toggle.classList.add('toggle-active')
        } else {
          body.classList.remove('dark-mode')
          toggle.classList.remove('toggle-active')
        }
      }, [isDarkMode])

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        console.log(isDarkMode);
    };

    return (
        <span id="toggle-dark" onClick={toggleDarkMode}>
            <div id="toggle-dark-inner"/>
        </span>
    )
};

export default ToggleDark;