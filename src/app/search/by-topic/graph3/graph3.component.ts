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
export class Graph3Component {
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
    console.log(sourceNames)
    console.log(trueCounts)
  
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
      };
      const config = {
        responsive: true,
      };
      Plotly.newPlot('graphTopic3', data,layout,config);
    }
}
