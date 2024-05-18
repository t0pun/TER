import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import Plotly, { Data } from 'plotly.js-basic-dist-min';
import { FiltreService } from '../filtre.service';
import { ListeentityService } from '../listeentity.service';

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

  constructor(private filtreService: FiltreService,private listeEntityService : ListeentityService){
    this.filtreService.submitTriggeredTopEntity$.subscribe(()=>{

      this.data = this.filtreService.fetchDataTopEntity().subscribe((response) => {
        this.data = response;
        console.log(this.data)
        this.buildChart(this.data)
      });
      //this.ngOnResearch();
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private buildChart(data1: any): void {
    const values: number[] = []
    const labels: string[] = []
    const colors: string[] = []

    for (let i = 0; i < data1.length; i++){
      labels.push(data1[i]['entity'])
      values.push(data1[i]['counts'])
      colors.push(this.generateRandomColor())
    }

    this.listeEntityService.updateData(labels)

    const data: Data[]= [{
      type: 'pie',
      values: values, // Example counts for different themes
      labels: labels, // Example theme names
      textinfo: 'label+percent',  // Show label and the percentage
      insidetextorientation: 'radial', // Orientation of the text value
      hoverinfo: 'label+value', // Show theme name and count on hover
      textposition: 'inside',
      automargin: true,
      marker: {
        colors: colors // Custom colors for each slice
    }
    }];

  const layout = {
    title: 'Top 50 - Most Used Entity',
    margin: { "t": 50, "b": 50, "l": 0, "r": 0 },
    showlegend: true
  };

  var config = {responsive: true}

  Plotly.newPlot('graph2', data, layout,config);
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

