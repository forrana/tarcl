import * as d3 from "d3"
import { Clock } from "./src/clock"
import Chart from "./src/chart"
import { OUTER_RADIUS, INNER_RADIUS, CORNER_RADIUS } from "./src/consts"

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
