import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Example extends React.Component {
  constructor() {
    super();

    this.state = {
      time: {},
      // sec: 0,
      gethour: 0,
      seconds: 0
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    // console.log("HH", hours);

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    // console.log("MM", minutes);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    // console.log("SS", seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }
  getHour = event => {
    console.log("Changed");
    // this.setState({ gethour: event.target.value });
    this.setState({ gethour: event.target.value });
    // console.log("event.target.value", event.target.value);
  };
  startTimer() {
    var hms = this.state.gethour; //"01:04:33"; // your input string
    // var a = hms.split(":"); // split it at the colons
    // var sec = Math.floor(hms / 3600);

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var sec = hms * 60 * 60;
    this.setState({ seconds: sec });

    console.log("sec", sec);

    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });
    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    console.log("render", this.state.gethour, this.state.sec);
    return (
      <div>
        <input
          type="number"
          value={this.state.gethour}
          onChange={this.getHour}
        />
        <button onClick={this.startTimer}>Start</button>
        h: {this.state.time.h} m: {this.state.time.m} s: {this.state.time.s}
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<Example />, rootElement);
