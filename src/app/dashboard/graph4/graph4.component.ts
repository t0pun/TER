import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import Plotly, { Data, Layout} from 'plotly.js-basic-dist-min';
import { FiltreService } from '../../filtre.service';

@Component({
  selector: 'app-graph4',
  standalone: true,
  imports: [],
  templateUrl: './graph4.component.html',
  styleUrl: './graph4.component.css'
})
export class Graph4Component implements OnInit{
  data: any;
  private apiUrl = "http://127.0.0.1:5000/json_per_langue_label"
  private http = inject(HttpClient)

  constructor(private filtreService: FiltreService){
    this.filtreService.submitTriggeredPerLangue$.subscribe(()=>{

      this.data = this.filtreService.fetchDataPerLangue().subscribe((response) => {

        this.data = response;
        console.log(this.data)
        this.buildChart(this.data)

      });

    });
  }

  ngOnInit(): void {

    this.fetchData();
  }

  private buildChart(data_1 : any): void {

  var sourceNames: string[] = [];
  var trueCounts: any[] = [];
  var falseCounts: any[] = [];
  var mixedCounts: any[] = [];
  var otherCounts: any[] = [];
  var allCounts: number[] = [];


  for (let i = 0; i < data_1.length; i++) {
    if(data_1[i]['label']=="TRUE"){
      trueCounts.push({"langue":data_1[i]['headlineLang'],"counts":data_1[i]['counts']})
    }else if(data_1[i]['label']=="FALSE"){
      falseCounts.push({"langue":data_1[i]['headlineLang'],"counts":data_1[i]['counts']})
    }else if(data_1[i]['label']=="MIXTURE"){
      mixedCounts.push({"langue":data_1[i]['headlineLang'],"counts":data_1[i]['counts']})
    }else{
      otherCounts.push({"langue":data_1[i]['headlineLang'],"counts":data_1[i]['counts']})
    }
  }
  
  sourceNames = trueCounts.map(dictionary => dictionary["langue"])
  console.log(sourceNames)
  console.log(trueCounts)

  var data: Data[]= [
    {
      name:'True',
      x: trueCounts.map(dictionary => dictionary["langue"]),
      y: trueCounts.map(dictionary => dictionary["counts"]),
      type: 'bar'
    },
    {
      name:'False',
      x: falseCounts.map(dictionary => dictionary["langue"]),
      y: falseCounts.map(dictionary => dictionary["counts"]),
      type: 'bar'
    },
    {
      name:'Mixture',
      x: mixedCounts.map(dictionary => dictionary["langue"]),
      y: mixedCounts.map(dictionary => dictionary["counts"]),
      type: 'bar'
    },
    {
      name:'Other',
      x: otherCounts.map(dictionary => dictionary["langue"]),
      y: otherCounts.map(dictionary => dictionary["counts"]),
      type: 'bar'
    }
  ];

    const layout: Partial<Layout> = { 
      barmode: 'stack',  // How do you want the bars to be positioned 
    };
    const config = {
      responsive: true,
    };
    Plotly.newPlot('graph4', data,layout,config);
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
