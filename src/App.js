import Time from './Time.js';

function App() {

  return (
    <div className="app">

      <Time timezone="Singapore" description="Singapore (Local)" />

      <Time timezone="Australia/Sydney" description="Australia (Sydney)" />

      <Time timezone="America/New_York" description="New York (ET)" />

      <Time timezone="Europe/London" description="London (GMT/BST)" />

    </div>
  );
}

export default App;
