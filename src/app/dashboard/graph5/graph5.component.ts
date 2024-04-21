import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import Plotly, { Data, Layout} from 'plotly.js-basic-dist-min';

@Component({
  selector: 'app-graph5',
  standalone: true,
  imports: [],
  templateUrl: './graph5.component.html',
  styleUrl: './graph5.component.css'
})
export class Graph5Component implements OnInit{
  data: any;
  private apiUrl = "http://127.0.0.1:5000/json_per_source_label"
  private http = inject(HttpClient)
  
  ngOnInit(): void {
    this.fetchData();
  }

  private buildChart(data_1: any): void {

    const sourceNames: string[] = [];
    const trueCounts: number[] = [];
    const falseCounts: number[] = [];
    const allCounts: number[] = [];

    console.log(data_1[0])
    for (let i = 0; i < data_1.length; i++) {
      const source = data_1[i]['Source'];
      if (!sourceNames.includes(source)) {
        sourceNames.push(source);
      }
      if (data_1[i]['Label'] === 'TRUE') {
        trueCounts.push(data_1[i]['Numbers of claims']);
      } else if (data_1[i]['Label'] === 'FALSE') {
        falseCounts.push(data_1[i]['Numbers of claims']);
      }
  
    }
    console.log(trueCounts)
    console.log(allCounts)
    var data: Data[] = [
      {
        x: trueCounts,
        y: falseCounts,
        mode: 'markers',
        marker: {
          color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
          opacity: [1, 0.8, 0.6, 0.4],
          size: [40, 60, 80, 100]
        }
      }
    ];
    
    var layout = {
      title: 'Bubble Chart Hover Text',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('graph5', data, layout);
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
