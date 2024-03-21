import { Component, OnInit } from '@angular/core';
import Plotly, { Data, Layout } from 'plotly.js-basic-dist-min';

@Component({
  selector: 'app-graph1',
  standalone: true,
  imports: [],
  templateUrl: './graph1.component.html',
  styleUrl: './graph1.component.css'
})
export class Graph1Component implements OnInit{

  ngOnInit(): void {
    this.buildChart();
  }
  private buildChart(): void {
    const sampleDates = ['2023-01-01', '2023-01-15', '2023-02-01', '2023-02-15', '2023-03-01'];
    const trueCounts = [120, 150, 180, 200, 230];
    const falseCounts = [80, 120, 150, 160, 170];
    const mixedCounts = [50, 60, 70, 80, 90];
    const otherCounts = [30, 35, 40, 45, 50];
    const allCounts = [280, 365, 440, 485, 540];
    const traces: Data[] = [
      {
        type: 'scatter',
        mode: 'lines',
        name: 'True',
        x: sampleDates,
        y: trueCounts,
        line: { color: '#17BECF' }
      },
      {
        type: 'scatter',
        mode: 'lines',
        name: 'False',
        x: sampleDates,
        y: falseCounts,
        line: { color: '#7F7F7F' }
      },
      {
        type: 'scatter',
        mode: 'lines',
        name: 'Mixed',
        x: sampleDates,
        y: mixedCounts,
        line: { color: '#DAA520' }
      },
      {
        type: 'scatter',
        mode: 'lines',
        name: 'Others',
        x: sampleDates,
        y: otherCounts,
        line: { color: '#B22222' }
      },
      {
        type: 'scatter',
        mode: 'lines',
        name: 'All',
        x: sampleDates,
        y: allCounts,
        line: { color: '#2E8B57' }
      }
    ];

    const layout: Partial<Layout> = {
      title: 'Number of Claims Over Time',
      xaxis: {
        type: 'date',
        title: 'Date'
      },
      yaxis: {
        title: 'Number of Claims'
      }
    };

    Plotly.newPlot('graph1', traces, layout);
  }
}
