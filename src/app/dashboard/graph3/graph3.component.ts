import { Component, OnInit } from '@angular/core';
import Plotly, { Data, Layout} from 'plotly.js-basic-dist-min';

@Component({
  selector: 'app-graph3',
  standalone: true,
  imports: [],
  templateUrl: './graph3.component.html',
  styleUrl: './graph3.component.css'
})
export class Graph3Component implements OnInit{
  ngOnInit(): void {
    this.buildChart();
  }

  private buildChart(): void {
    // Names of the sources
const sourceNames = [
  'Source 1', 'Source 2', 'Source 3', 'Source 4', 'Source 5',
  'Source 6', 'Source 7', 'Source 8', 'Source 9', 'Source 10',
  'Source 11', 'Source 12', 'Source 13'
];

// Counts of true claims for each source
const allCounts = [
  230, 255, 315, 260, 320,
  300, 330, 360, 390, 420,
  450, 480, 510
];
const trueCounts = [
  120, 150, 180, 130, 200,
  160, 170, 180, 190, 200,
  210, 220, 230
];

// Counts of false claims for each source
const falseCounts = [
  80, 60, 90, 70, 50,
  60, 70, 80, 90, 100,
  110, 120, 130
];

// Counts of mixed claims for each source
const mixedCounts = [
  20, 30, 25, 35, 40,
  45, 50, 55, 60, 65,
  70, 75, 80
];

// Counts of other claims for each source
const otherCounts = [
  10, 15, 20, 25, 30,
  35, 40, 45, 50, 55,
  60, 65, 70
];


    const data : Data[]= [
      { 
        x: sourceNames,
        y: allCounts,
        name: 'All',
        type: 'bar',
        marker: { color: '#002F5D' } 
      },
      { 
        x: sourceNames,
        y: trueCounts,
        name: 'True',
        type: 'bar',
        marker: { color: '#8BC1F7' } 
      },
      { 
        x: sourceNames,
        y: falseCounts,
        name: 'False',
        type: 'bar',
        marker: { color: '#004B95' } 
      },
      { 
        x: sourceNames,
        y: mixedCounts,
        name: 'Mixed',
        type: 'bar',
        marker: { color: '#06C' } 
      },
      { 
        x: sourceNames,
        y: otherCounts,
        name: 'Other',
        type: 'bar',
        marker: { color: '#519DE9' } 
      },

    ];

    const layout: Partial<Layout> = { 
      barmode: 'group',  // How do you want the bars to be positioned 
      title: 'Claims Count by Source and Truthfulness',
      xaxis: { title: 'Source' },
      yaxis: { title: 'Count of Claims' }
    };
    const config = {
      responsive: true,
    };
    Plotly.newPlot('graph3', data, layout, config);
  }
}
