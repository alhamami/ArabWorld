import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  template: '<plotly-plot [data]="graph.data" [layout]="graph.layout"></plotly-plot>',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  title = 'dynamic-plots';
  // Bar Chart
  graph1 = {
    data: [
      { x: ["Arab world","European Union","USA"], y: [430753333, 447007596, 335078143], type: 'bar' },
    ],
    layout: {
      colorway: ["#6897BB"],
      title: 'Population of the Arab world compared to the European Union and USA'}
  };
  // Line chart
  graph2 = {
    data: [
      { x: [2010, 2011, 2012, 2013, 2014,2015,2016,2017,2018,2019,2020,2021,2022],
         y: [87252413, 89200054, 91240376, 93377890, 95592324, 97723799, 99784030, 101789386, 103740765,	105618671, 107465134, 109262178,110990103], type: 'scatter' },
    ],
    layout: {title: 'Egypt\'s population increase'}
  };

  constructor() { }

  ngOnInit(): void {
  }

}
