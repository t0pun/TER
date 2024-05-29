import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
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
  private apiUrl = "http://127.0.0.1:5000/json_per_date1_label?date1=1996&date2=2024&granularite=mois"
  private http = inject(HttpClient)
  @Input() isloaded = true

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
    
    for (let i = 0; i < data.length; i++) {
      const currentDate = data[i]['date1'];
      if (!sampleDates.includes(currentDate)) {
        sampleDates.push(currentDate);
        trueCounts.push({ date1: currentDate, counts: 0 });
        falseCounts.push({ date1: currentDate, counts: 0 });
        mixedCounts.push({ date1: currentDate, counts: 0 });
        otherCounts.push({ date1: currentDate, counts: 0 });
        allCounts.push({ date1: currentDate, counts: 0 });
      }
    
      if (data[i]['label'] == 'TRUE') {
        for (let j = 0; j < trueCounts.length; j++) {
          if (trueCounts[j].date1 === currentDate) {
            trueCounts[j].counts += data[i]['counts'];
            break;
          }
        }
      } else if (data[i]['label'] == 'FALSE') {
        for (let j = 0; j < falseCounts.length; j++) {
          if (falseCounts[j].date1 === currentDate) {
            falseCounts[j].counts += data[i]['counts'];
            break;
          }
        }
      } else if (data[i]['label'] == 'MIXTURE') {
        for (let j = 0; j < mixedCounts.length; j++) {
          if (mixedCounts[j].date1 === currentDate) {
            mixedCounts[j].counts += data[i]['counts'];
            break;
          }
        }
      } else if (data[i]['label'] == 'OTHER') {
        for (let j = 0; j < otherCounts.length; j++) {
          if (otherCounts[j].date1 === currentDate) {
            otherCounts[j].counts += data[i]['counts'];
            break;
          }
        }
      }
    
      for (let j = 0; j < allCounts.length; j++) {
        if (allCounts[j].date1 === currentDate) {
          allCounts[j].counts += data[i]['counts'];
          break;
        }
      }
    }


    const traces: Data[] = [
      {
        type: 'scatter',
        mode: 'lines',
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
      },
      margin: { t: 50, b: 50, l: 50, r: 200 }, 
      legend: {
          x: 5.1,
          y: 1,
          bgcolor: 'rgba(255, 255, 255, 0.5)', 
          bordercolor: 'rgba(0, 0, 0, 0.5)', 
          borderwidth: 1 
      }
    };

    Plotly.newPlot('graph1', traces, layout);
    
  }
  fetchData() {
    fetch(this.apiUrl)
      .then(response => response.json())
      .then(data => {
        this.data=data;
        this.buildChart(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  downloadTSV(): void {
    const data = this.data;
    let tsvContent = "data:text/tab-separated-values;charset=utf-8,";

    data.forEach((row: any) => {
      const rowArray = [row['date1'], row['label'], row['counts']];
      tsvContent += rowArray.join("\t") + "\n";
    });

    const encodedUri = encodeURI(tsvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.tsv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  }
}