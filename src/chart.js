import * as d3 from "d3"
import { INNER_RADIUS, OUTER_RADIUS, CORNER_RADIUS } from "./consts"

export default class Chart{
  constructor(data) {
    this.svg = d3.select("svg")
    let width = +this.svg.attr("width")
    let height = +this.svg.attr("height")
    this.layer1 = this.svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 +")")
    this.data = data
    this.arc = d3.arc()
      .innerRadius(INNER_RADIUS)
      .outerRadius(OUTER_RADIUS)
      .cornerRadius(CORNER_RADIUS)
    this.arcs = d3.pie()
        .value((d) => d.value )
        .sort((a, b) => a.index - b.index)
        (this.data);
  }

  draw() {
    let _this = this
    this.layer1.selectAll("path")
      .data(this.arcs)
      .enter()
      .append("path")
      .style("fill", (d,i) =>  d3.color(`hsl(${d.value*10 + i*10}, 30%, 50%)`))
      .attr("d", this.arc)
      .each(function (d,i) {
        let firstArcSection = /(^.+?)L/
        let newArc = firstArcSection.exec( d3.select(this).attr("d") )[1]
        newArc = newArc.replace(/,/g , " ")
        _this.svg.append("path")
          .attr("class", "hiddenDonutArcs")
          .attr("id", "donutArc"+i)
          .attr("d", newArc)
          .style("fill", "none")
       }
      )

    this.layer1.selectAll(".donutText")
    	.data(this.data)
      .enter().append("text")
    	.attr("class", "donutText")
      .attr("dy", -13)
      .append("textPath")
    	.attr("startOffset","50%")
    	.style("text-anchor","middle")
    	.attr("xlink:href", (d,i) => "#donutArc"+i)
    	.text((d) => d.name);
  }

}
