import React from 'react';
// Link to timezone: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

class Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
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
            <div>
                <h1>
                    <p>{this.props.description}</p>
                    <span id="time">{this.state.date.toLocaleTimeString('en-GB', {hour:'numeric', minute:'numeric', second: 'numeric', timeZone:`${this.props.timezone}`})}</span>
                    <span id="date">{this.state.date.toLocaleDateString('en-GB', {year:'numeric', month:'long', day:'numeric', weekday:'long', timeZone:`${this.props.timezone}`})}</span>
                </h1>
            </div>
        );
    }
}

export default Time;