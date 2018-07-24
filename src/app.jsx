import React from "react";
import { Clock } from "./clock"
import Chart from "./chart"


class App extends React.Component {
  componentDidMount() {
    let data = [
      {"value": 10, "name": "Warming up", index: 1},
      {"value":  5, "name": "Correction", index: 2},
      {"value": 10, "name": "Previous topic check", index: 3},
      {"value": 20, "name": "New topic", index: 4},
      {"value": 10, "name": "New topic check", index: 5},
    ];

    let chart = new Chart(data)
    chart.draw()
    let clock = new Clock()

    setInterval(() => clock.count(), 1000);
  }

  render() {
    return(
      <div>
        <svg width="960" height="550">
        </svg>
      </div>
    )
  }
}

export default App
