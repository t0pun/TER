import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Plotly, { Data, Layout } from 'plotly.js-basic-dist-min';

@Component({
  selector: 'app-graph3',
  standalone: true,
  imports: [NgIf],
  templateUrl: './graph3.component.html',
  styleUrl: './graph3.component.css'
})
export class Graph3Component implements OnChanges {
  @Input() entityData: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['entityData'] && this.entityData) {
      this.buildChart(this.entityData);
    }
  }
  private buildChart(data_1 : any): void {

    var sourceNames: string[] = [];
    var trueCounts: any[] = [];
    var falseCounts: any[] = [];
    var mixedCounts: any[] = [];
    var otherCounts: any[] = [];
  
    for (let i = 0; i < data_1.length; i++) {
      if(data_1[i]['label']=="TRUE"){
        trueCounts.push({"source":data_1[i]['source'],"counts":data_1[i]['counts']})
      }else if(data_1[i]['label']=="FALSE"){
        falseCounts.push({"source":data_1[i]['source'],"counts":data_1[i]['counts']})
      }else if(data_1[i]['label']=="MIXTURE"){
        mixedCounts.push({"source":data_1[i]['source'],"counts":data_1[i]['counts']})
      }else{
        otherCounts.push({"source":data_1[i]['source'],"counts":data_1[i]['counts']})
      }
    }
    
    sourceNames = trueCounts.map(dictionary => dictionary["source"])
  
    var data: Data[]= [
      {
        name:'True',
        x: trueCounts.map(dictionary => dictionary["source"]),
        y: trueCounts.map(dictionary => dictionary["counts"]),
        type: 'bar'
      },
      {
        name:'False',
        x: falseCounts.map(dictionary => dictionary["source"]),
        y: falseCounts.map(dictionary => dictionary["counts"]),
        type: 'bar'
      },
      {
        name:'Mixture',
        x: mixedCounts.map(dictionary => dictionary["source"]),
        y: mixedCounts.map(dictionary => dictionary["counts"]),
        type: 'bar'
      },
      {
        name:'Other',
        x: otherCounts.map(dictionary => dictionary["source"]),
        y: otherCounts.map(dictionary => dictionary["counts"]),
        type: 'bar'
      }
    ];
  
      const layout: Partial<Layout> = { 
        barmode: 'stack',  // How do you want the bars to be positioned 
        margin: { t: 50, b: 50, l: 50, r: 200 }, 
        legend: {
            x: 5.1, 
            y: 1,
            bgcolor: 'rgba(255, 255, 255, 0.5)', 
            bordercolor: 'rgba(0, 0, 0, 0.5)', 
            borderwidth: 1 
        }
      };
      const config = {
        responsive: true,
      };
      Plotly.newPlot('graph3', data,layout,config);
    }
}
