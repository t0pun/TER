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
  private apiUrltrue = "http://127.0.0.1:5000/json_per_true"
  private apiUrlfalse = "http://127.0.0.1:5000/json_per_false"
  private http = inject(HttpClient)
  
  ngOnInit(): void {
    this.fetchData();
  }

  private buildChart(data_1: any,data_2: any): void {

    const sourceNames: string[] = [];
    const trueCounts: number[] = [];
    const falseCounts: number[] = [];
    const allCounts: number[] = [];

    console.log(data_1[0])

    for (let i = 0; i < data_1.length; i++) {

      sourceNames.push(data_1[i]['source']);
      trueCounts.push(data_1[i]['counts']);
      falseCounts.push(data_2[i]['counts']);
      allCounts.push(data_1[i]['counts']+data_2[i]['counts'])
    }

    let valeurMax = Math.max(...allCounts);

    // Normaliser les valeurs en pourcentages
    for (let i = 0; i < trueCounts.length; i++) {
      allCounts[i] = ((allCounts[i] / valeurMax) * 100);
    }

    console.log(trueCounts)
    console.log(allCounts)

    var data: Data[] = [
      {
        x: trueCounts,
        y: falseCounts,
        text: sourceNames,
        legend : sourceNames,
        mode: 'markers',
        marker: {
          color: [this.generateRandomColor(),this.generateRandomColor(),this.generateRandomColor(),this.generateRandomColor(),this.generateRandomColor(),this.generateRandomColor(),this.generateRandomColor(),this.generateRandomColor(),this.generateRandomColor(),this.generateRandomColor(),this.generateRandomColor(),this.generateRandomColor()],
          opacity: [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],
          size: allCounts
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
    fetch(this.apiUrltrue)
      .then(response => response.json())
      .then(datatrue => {
        fetch(this.apiUrlfalse)
        .then(response => response.json())
        .then(datafalse => {
          this.buildChart(datatrue,datafalse)
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}
