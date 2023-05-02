import React from 'react';
// Link to timezone: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

class Time extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()};
        this.goFullScreen = this.goFullScreen.bind(this);
        this.timeId = `time-${this.props.id}`;
    }

    componentDidMount() {
        this.timerID = setInterval( () => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div className="time" id={this.timeId} onClick={this.goFullScreen}>
                <h1 id="time_header">
                    <p>{this.props.description}</p>
                    <span id="clock">{this.state.date.toLocaleTimeString('en-GB', {hour:'numeric', minute:'numeric', second: 'numeric', timeZone:`${this.props.timezone}`})}</span>
                    <span id="date">{this.state.date.toLocaleDateString('en-GB', {year:'numeric', month:'long', day:'numeric', weekday:'long', timeZone:`${this.props.timezone}`})}</span>
                </h1>
            </div>
        );
    }

    goFullScreen() {
        let elem = document.querySelector(`#${this.timeId}`);
        console.log(`${this.timeId}`);
        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch((err) => {
              alert(
                `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
              );
            });
          } else {
            document.exitFullscreen();
          }
    }
}

export default Time;