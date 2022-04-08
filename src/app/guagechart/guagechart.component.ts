import { Component, OnInit } from '@angular/core';
declare var google:any;


@Component({
  selector: 'app-guagechart',
  templateUrl: './guagechart.component.html',
  styleUrls: ['./guagechart.component.scss']
})
export class GuagechartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    google.charts.load('current', {'packages':['gauge']});
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart(){
    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Memory', 66]
      //['CPU', 55],
      //['Network', 68]
    ]);

    var options = {
      width: 400, height: 120,
      redFrom: 90, redTo: 100,
      yellowFrom:75, yellowTo: 90,
      minorTicks: 5
    };
    var options = {
      width: 400, height: 120,
      redFrom: 90, redTo: 100,
      yellowFrom:75, yellowTo: 90,
      minorTicks: 5
    };
      

    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
chart.draw(data,options);
    //chart.draw(data, options);

   /* setInterval(function() {
      data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
      chart.draw(data, options);
    }, 13000);
    setInterval(function() {
      data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
      chart.draw(data, options);
    }, 5000);
    setInterval(function() {
      data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
      chart.draw(data, options);
    }, 26000);*/
  }

}
