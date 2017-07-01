import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as Moment from 'moment';
import * as D3 from 'd3/index';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  @ViewChild('chart') chart: any = null;
  chartE: any = null;
  width: number;
  height: number;
  margin: any = {
    left: 40,
    top: 40,
    right: 40,
    bottom: 20
  };
  xScale: any;
  yScale: any;
  host: any;
  svg: any;
  xAxis: any;
  yAxis: any;
  yScale2:any;
  @Input() private data: Array<any>;
  constructor() { }

  ngOnInit() {
    this.chartE = this.chart.nativeElement;
    this.host = D3.select(this.chartE);
    this.svg = this.host.append("svg")
    this.setChartDimentions(900, 300);
    this.buildSVG();
    this.populate();
    this.drawXAxis();
    this.drawYAxis();
  }

  updateChart(data: JSON[]) {

  }
  setChartDimentions(w, h) {
    this.width = w;
    this.height = h;
    this.xScale = D3.scaleLinear()
      .range([this.margin.left, this.width - this.margin.right])
      .domain([D3.min(this.data, (d) => d.x), D3.max(this.data, (d) => d.x)]);
    this.yScale = D3.scaleLinear()
      .range([this.margin.bottom, this.height - this.margin.top - this.margin.bottom])
      .domain([D3.min(this.data, (d) => d.y), D3.max(this.data, (d) => d.y)]);
    this.yScale2 = D3.scaleLinear()
      .range([this.height - this.margin.top - this.margin.bottom, this.margin.bottom])
      .domain([D3.min(this.data, (d) => d.y), D3.max(this.data, (d) => d.y)]);
  }
  drawXAxis() {
    this.xAxis = D3.axisBottom(this.xScale);

    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (this.height - this.margin.bottom) + ')')
      .call(this.xAxis);
  }
  drawYAxis() {
    this.yAxis = D3.axisLeft(this.yScale2);

    this.svg.append('g')
      .attr('class', 'y axis')
      .call(this.yAxis)
      .attr('transform', 'translate('+(this.margin.left) + ', '+ this.margin.bottom+')')
  }
  buildSVG() {
    this.svg.attr("width", this.width);
    this.svg.attr("height", this.height);
  }
  populate() {
    let data: any[] = this.data;
    let width = 10;
    let height = this.height;
    let yScale = this.yScale;
    let xScale = this.xScale;
    let bottom = this.margin.bottom;
    this.svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function (d, i) { // sets the x position of the bar
        return (xScale(d.x) - width/2);
      })
      .attr('y', function (d, i) { // sets the y position of the bar
        return height - yScale(d.y) - bottom;
      })
      .attr('width', width) // sets the width of bar
      .attr('height', (d) => yScale(d.y))
      .attr('fill', 'green')
      .attr('stroke', '#000')

    /**
     * For removing text labels please comment this block
     */


    this.svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'text')
      .attr('x', (d)=> (xScale(d.x)) - 10) // sets the width of bar
      .attr('y', (d) => (height - yScale(d.y) -5- bottom))
      .text((d) => d.y)
      .attr('width',width)
      .style("font-size","8px")
  }
}
