import React, { Component } from 'react';
import * as d3 from 'd3';

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart = () => {
    const data = [12, 5, 6, 6, 9, 10];
    const svg = d3
      .select('#TestD3')
      .append('svg')
      .attr('width', 700)
      .attr('height', 300)
      .style('margin-left', 50);
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => 300 - 10 * d)
      .attr('width', 65)
      .attr('height', (d, i) => d * 10)
      .attr('fill', '#e44');
  };

  render() {
    return <div id="TestD3" />;
  }
}

export default BarChart;
