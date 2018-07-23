import * as d3 from "d3"
import { OUTER_RADIUS } from "./consts"

export class Clock {
  constructor() {
    let svg = d3.select("svg")
    this.layer2 = svg.append("g")
      .attr("transform", "translate(" + +svg.attr("width") / 2 + "," + +svg.attr("height") / 2 +")")

    this.fullArc = d3.arc()
      .innerRadius(0)
      .outerRadius(OUTER_RADIUS)

    this.timerCounter = 1

    this.timeArcsData = [
      { value: 3000 - this.timerCounter, index: 1, color: 0 },
      { value: this.timerCounter, index: 2, color: 1 }
    ]

    this.timerArcs = d3.pie()
      .value((d) => d.value )
      .sort((a, b) => a.index + b.index)
      (this.timeArcsData)

    this.layer2.selectAll("timer")
        .data(this.timerArcs)
        .enter()
        .append("path")
        .style("fill", "rgba(255, 255, 255, 0.0)")
        .attr("d", this.fullArc)
    }

    count() {
      this.timerCounter++
      this.timeArcsData[0].value = 3000-this.timerCounter
      this.timeArcsData[1].value = this.timerCounter
      let updatedLayedOutData = d3.pie()
        .value((d) => d.value )
        .sort((a, b) => a.index + b.index)
        (this.timeArcsData)

      this.layer2.selectAll("timer")
        .data(updatedLayedOutData)
        .enter()
        .select("path")
        .style("fill", "white")
        .style("fill", function (d,i){
          d3.color(`rgba(256, 256, 256, ${d.color*0.5 })`)
        })
        .attr("d", this.fullArc)
    }
}
