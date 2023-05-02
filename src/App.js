import Time from './Time.js';
import ToggleDark from './ToggleDark.js';

function App() {
  /*
  const button_dark = document.querySelector("#btn-dark");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme == "dark") {
    document.body.classList.toggle("dark-mode");
  } else if (currentTheme == "light") {
    document.body.classList.toggle("light-mode");
  }

  btn.addEventListener("click", function() {
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle("light-mode");
      var theme = document.body.classList.contains("light-mode") ? "light" : "dark";
    } else {
      document.body.classList.toggle("dark-mode");
      var theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    }
    localStorage.setItem("theme", theme);
  });
  */

  return (
    <div className="app">

      <div className="top_row">
        <ToggleDark />
      </div>

      <div className="timezones">

        <Time id="time1" timezone="Singapore" description="Singapore (Local)" />

        <Time id="time2" timezone="Australia/Sydney" description="Australia (Sydney)" />

        <Time id="time3" timezone="America/New_York" description="New York (ET)" />

        <Time id="time4" timezone="Europe/London" description="London (GMT/BST)" />
      </div>
      

    </div>
  );
}

export default App;
