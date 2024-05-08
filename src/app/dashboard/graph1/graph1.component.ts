import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import Plotly, { Data, Layout } from 'plotly.js-basic-dist-min';
import { FiltreService } from '../../filtre.service';

@Component({
  selector: 'app-graph1',
  standalone: true,
  imports: [],
  templateUrl: './graph1.component.html',
  styleUrl: './graph1.component.css'
})
export class Graph1Component implements OnInit{
  data: any;
  private apiUrl = "http://127.0.0.1:5000/json_per_date1_label/1996/2023"
  private http = inject(HttpClient)

  constructor(private filtreService: FiltreService){
    this.filtreService.submitTriggered$.subscribe(()=>{

      this.data = this.filtreService.fetchDataFirstGraph().subscribe((response) => {
        this.data = response;
        console.log(this.data)
        this.buildChart(this.data)
      });
      //this.ngOnResearch();
    });
  }

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
      console.log("ieme date : "+current_date)
      var current_date = data[i]['date1'];
      sampleDates.push(current_date)
      if(data[i]['label']=='TRUE'){
        trueCounts.push(data[i]['counts'])
        falseCounts.push(0)
        mixedCounts.push(0)
        otherCounts.push(0)
      }else if(data[i]['label']=='FALSE'){
        trueCounts.push(0)
        mixedCounts.push(0)
        otherCounts.push(0)
        falseCounts.push(data[i]['counts'])
      }
      else if(data[i]['label']=='MIXTURE'){
        falseCounts.push(0)
        trueCounts.push(0)
        otherCounts.push(0)
        mixedCounts.push(data[i]['counts'])
      }
      else if(data[i]['label']=='OTHER'){
        falseCounts.push(0)
        mixedCounts.push(0)
        trueCounts.push(0)
        otherCounts.push(data[i]['counts'])
      }
    }
    
    console.log("size date : "+sampleDates.length)
    console.log("size true : "+trueCounts.length)
    console.log("size false : "+falseCounts.length)
    console.log("size mixed : "+mixedCounts.length)
    console.log("size other : "+otherCounts.length)


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
        console.log(data)
        this.buildChart(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}