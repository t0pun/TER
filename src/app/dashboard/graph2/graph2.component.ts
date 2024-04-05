import { Component, OnInit } from '@angular/core';
import Plotly, { Data } from 'plotly.js-basic-dist-min';

@Component({
  selector: 'app-graph2',
  standalone: true,
  imports: [],
  templateUrl: './graph2.component.html',
  styleUrl: './graph2.component.css'
})
export class Graph2Component implements OnInit{
  ngOnInit(): void {
    this.buildChart();
  }

  private buildChart(): void {
    const data: Data[]= [{
      type: 'pie',
      values: [20, 14, 23, 25], // Example counts for different themes
      labels: ['Theme 1', 'Theme 2', 'Theme 3', 'Theme 4'], // Example theme names
      textinfo: 'label+percent',  // Show label and the percentage
      insidetextorientation: 'radial', // Orientation of the text value
      hoverinfo: 'label+value', // Show theme name and count on hover
      textposition: 'outside',
      automargin: true,
      marker: {
        colors: ['#F0AB00', '#8A8D90', '#009596', '#5752D1'] // Custom colors for each slice
    }
    }];

  const layout = {
    title: 'Percentage of Claims by Theme',
    height: 400,
    width: 500,
    margin: { "t": 50, "b": 50, "l": 0, "r": 0 },
    showlegend: true
  };

  Plotly.newPlot('graph2', data, layout);
}
}

