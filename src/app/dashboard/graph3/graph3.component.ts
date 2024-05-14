import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import Plotly, { Data, Layout} from 'plotly.js-basic-dist-min';

@Component({
  selector: 'app-graph3',
  standalone: true,
  imports: [],
  templateUrl: './graph3.component.html',
  styleUrl: './graph3.component.css'
})
export class Graph3Component implements OnInit{
  data: any;
  private apiUrl = "http://127.0.0.1:5000/json_per_source_label"
  private http = inject(HttpClient)
  
  ngOnInit(): void {
    this.fetchData();
  }

  private buildChart(data_1 : any): void {

  console.log(data_1);

  const sourceNames: string[] = [];
  const trueCounts: number[] = [];
  const falseCounts: number[] = [];
  const mixedCounts: number[] = [];
  const otherCounts: number[] = [];
  const allCounts: number[] = [];

  for (let i = 0; i < data_1.length; i++) {
    const source = data_1[i]['Source'];
    if (!sourceNames.includes(source)) {
      sourceNames.push(source);
    }
    if (data_1[i]['Label'] === 'TRUE') {
      trueCounts.push(data_1[i]['Numbers of claims']);
    } else if (data_1[i]['Label'] === 'FALSE') {
      falseCounts.push(data_1[i]['Numbers of claims']);
    } else if (data_1[i]['Label'] === 'MIXTURE') {
      mixedCounts.push(data_1[i]['Numbers of claims']);
    } else if (data_1[i]['Label'] === 'OTHER') {
      otherCounts.push(data_1[i]['Numbers of claims']);
    }

  }
  console.log(sourceNames)
  console.log(trueCounts)

  var data: Data[]= [
    {
      name:'True',
      x: sourceNames,
      y: trueCounts,
      type: 'bar'
    },
    {
      name:'False',
      x: sourceNames,
      y: falseCounts,
      type: 'bar'
    },
    {
      name:'Mixture',
      x: sourceNames,
      y: mixedCounts,
      type: 'bar'
    },
    {
      name:'Other',
      x: sourceNames,
      y: otherCounts,
      type: 'bar'
    }
  ];

    const layout: Partial<Layout> = { 
      barmode: 'stack',  // How do you want the bars to be positioned 
    };
    const config = {
      responsive: true,
    };
    Plotly.newPlot('graph3', data,layout,config);
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
