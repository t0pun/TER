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
    this.buildChart(this.fetchData());
  }

  private buildChart(data_1: any): void {


  const sourceNames: string[] = [];
  const trueCounts: number[] = [];
  const falseCounts: number[] = [];
  const mixedCounts: number[] = [];
  const otherCounts: number[] = [];
  const allCounts: number[] = [];

  for (let i = 0; i < data_1.length; i++){
    sourceNames.push(data_1[i]['Source'])
    if(data_1[i]['Label']='True'){
      trueCounts.push(data_1[i]['Numbers of claims'])
    }else if(data_1[i]['Label']='False'){
      trueCounts.push(data_1[i]['Numbers of claims'])
    }
  }

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
