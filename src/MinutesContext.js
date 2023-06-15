import { createContext, useContext, useEffect, useState } from "react"

const minutes = createContext();

const MinutesContext = ({children}) => {
    if (!localStorage.getItem("pomodoro")) {
        localStorage.setItem("pomodoro", 30);
    }
    let pomodoroMinutes = localStorage.getItem("pomodoro");

    if (!localStorage.getItem("short-break")) {
        localStorage.setItem("short-break", 5);
    }
    let shortBreakMinutes = localStorage.getItem("short-break");
    
    if (!localStorage.getItem("long-break")) {
        localStorage.setItem("long-break", 15);
    }
    let longBreakMinutes = localStorage.getItem("long-break");
    
    const [ currentPomodoroMinutes, setCurrentPomodoroMinutes ] = useState(pomodoroMinutes);
    const [ currentShortBreakMinutes, setCurrentShortBreakMinutes ] = useState(shortBreakMinutes);
    const [ currentLongBreakMinutes, setCurrentLongBreakMinutes ] = useState(longBreakMinutes);

    useEffect(() => {
        setCurrentPomodoroMinutes(pomodoroMinutes);
    }, [pomodoroMinutes])

    useEffect(() => {
        setCurrentShortBreakMinutes(shortBreakMinutes);
    }, [shortBreakMinutes])

    useEffect(() => {
        setCurrentLongBreakMinutes(longBreakMinutes);
    }, [longBreakMinutes])
  
    return (
    <minutes.Provider value={{currentPomodoroMinutes, setCurrentPomodoroMinutes, currentShortBreakMinutes, setCurrentShortBreakMinutes, currentLongBreakMinutes, setCurrentLongBreakMinutes}}>
        {children}
    </minutes.Provider>
  )
}
export default MinutesContext;

export const MinutesState = () => {
    return useContext(minutes);
}