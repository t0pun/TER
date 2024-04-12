import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import Plotly, { Data } from 'plotly.js-basic-dist-min';

@Component({
  selector: 'app-graph2',
  standalone: true,
  imports: [],
  templateUrl: './graph2.component.html',
  styleUrl: './graph2.component.css'
})
export class Graph2Component implements OnInit{
  data: any;
  private apiUrl = "http://127.0.0.1:5000/json_per_entity"
  private http = inject(HttpClient)

  ngOnInit(): void {
    this.fetchData();
  }

  private buildChart(data1: any): void {
    const values: number[] = []
    const labels: string[] = []
    const colors: string[] = []

    for (let i = 0; i < 10; i++){
      labels.push(data1[i]['Entity'])
      values.push(data1[i]['Numbers of claims'])
      colors.push(this.generateRandomColor())
    }

    const data: Data[]= [{
      type: 'pie',
      values: values, // Example counts for different themes
      labels: labels, // Example theme names
      textinfo: 'label+percent',  // Show label and the percentage
      insidetextorientation: 'radial', // Orientation of the text value
      hoverinfo: 'label+value', // Show theme name and count on hover
      textposition: 'outside',
      automargin: true,
      marker: {
        colors: colors // Custom colors for each slice
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
generateRandomColor(): string {
  const characters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    color += characters[randomIndex];
  }
  return color;
}
fetchData() {
  fetch(this.apiUrl)
    .then(response => response.json())
    .then(data => {
      this.buildChart(data)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}
}

