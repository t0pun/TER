import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import Plotly, { Data, Layout } from 'plotly.js-basic-dist-min';
import { FiltreService } from '../filtre.service';

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
    const trueCounts: any[] = [];
    const falseCounts: any[] = [];
    const mixedCounts: any[] = [];
    const otherCounts: any[] = [];
    const allCounts: any[] = [];

    for (let i = 0; i < data.length; i++){
      var current_date = data[i]['date1'];
      sampleDates.push(current_date)
      if(data[i]['label']=='TRUE'){
        trueCounts.push({"date1":data[i]['date1'],"counts":data[i]['counts']})
      }else if(data[i]['label']=='FALSE'){
        falseCounts.push({"date1":data[i]['date1'],"counts":data[i]['counts']})
      }
      else if(data[i]['label']=='MIXTURE'){
        mixedCounts.push({"date1":data[i]['date1'],"counts":data[i]['counts']})
      }
      else if(data[i]['label']=='OTHER'){
        otherCounts.push({"date1":data[i]['date1'],"counts":data[i]['counts']})
      }
    }


    const traces: Data[] = [
      {
        type: 'scatter',
        mode: 'lines+markers',
        name: 'True',
        x: trueCounts.map(dictionary => dictionary["date1"]),
        y: trueCounts.map(dictionary => dictionary["counts"]),
        line: { color: '#4CB140' }
      },
      {
        type: 'scatter',
        mode: 'lines',
        name: 'False',
        x: falseCounts.map(dictionary => dictionary["date1"]),
        y: falseCounts.map(dictionary => dictionary["counts"]),
        line: { color: '#A30000' }
      },
      {
        type: 'scatter',
        mode: 'lines', 
        name: 'Mixed',
        x: mixedCounts.map(dictionary => dictionary["date1"]),
        y: mixedCounts.map(dictionary => dictionary["counts"]),
        line: { color: '#519DE9' }
      },
      {
        type: 'scatter',
        mode: 'lines',
        name: 'Others',
        x: otherCounts.map(dictionary => dictionary["date1"]),
        y: otherCounts.map(dictionary => dictionary["counts"]),
        line: { color: '#F4C145' }
      },
      {
        type: 'scatter',
        mode: 'lines',
        name: 'All',
        x: allCounts.map(dictionary => dictionary["date1"]),
        y: allCounts.map(dictionary => dictionary["counts"]),
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