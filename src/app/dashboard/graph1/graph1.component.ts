import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import Plotly, { Data, Layout } from 'plotly.js-basic-dist-min';

@Component({
  selector: 'app-graph1',
  standalone: true,
  imports: [],
  templateUrl: './graph1.component.html',
  styleUrl: './graph1.component.css'
})
export class Graph1Component implements OnInit{
  data: any;
  private apiUrl = "http://127.0.0.1:5000/json_per_date1_label"
  private http = inject(HttpClient)

  ngOnInit(): void {
    this.fetchData()
  }
  buildChart(data: any): void{
    const sampleDates: string[] = [];
    const trueCounts: number[] = [];
    const falseCounts: number[] = [];
    const mixedCounts: number[] = [];
    const otherCounts: number[] = [];
    const allCounts: number[] = [];

    for (let i = 0; i < data.length; i++){
      var current_date = data[i]['Date1'];
      var year = parseInt(current_date.slice(0, 4))
      console.log(year)
        if (year >= 2022) {
          sampleDates.push(current_date)
          if(data[i]['Label']=='TRUE'){
            trueCounts.push(data[i]['Numbers of claims'])
          }else if(data[i]['Label']=='FALSE'){
            falseCounts.push(data[i]['Numbers of claims'])
          }
          else if(data[i]['Label']=='MIXTURE'){
            mixedCounts.push(data[i]['Numbers of claims'])
          }
          else if(data[i]['Label']=='OTHER'){
            otherCounts.push(data[i]['Numbers of claims'])
          }
      }
    }
    console.log(falseCounts)
    console.log(trueCounts)
    const traces: Data[] = [
      {
        type: 'scatter',
        mode: 'lines+markers',
        name: 'True',
        x: sampleDates,
        y: trueCounts,
        line: { color: '#4CB140' }
      },
      {
        type: 'scatter',
        mode: 'lines',
        name: 'False',
        x: sampleDates,
        y: falseCounts,
        line: { color: '#A30000' }
      },
      {
        type: 'scatter',
        mode: 'lines', 
        name: 'Mixed',
        x: sampleDates,
        y: mixedCounts,
        line: { color: '#519DE9' }
      },
      {
        type: 'scatter',
        mode: 'lines',
        name: 'Others',
        x: sampleDates,
        y: otherCounts,
        line: { color: '#F4C145' }
      },
      {
        type: 'scatter',
        mode: 'lines',
        name: 'All',
        x: sampleDates,
        y: allCounts,
        line: { color: '#009596', dash: 'dash' }
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