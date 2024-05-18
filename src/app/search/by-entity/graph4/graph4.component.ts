import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Plotly, { Data, Layout } from 'plotly.js-basic-dist-min';

@Component({
  selector: 'app-graph4',
  standalone: true,
  imports: [NgIf],
  templateUrl: './graph4.component.html',
  styleUrls: ['./graph4.component.css']
})
export class Graph4Component implements OnChanges {
  @Input() entityData: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['entityData'] && this.entityData) {
      this.buildChart(this.entityData);
    }
  }

  private buildChart(data_1: any): void {
    var languageNames: string[] = [];
    var trueCounts: any[] = [];
    var falseCounts: any[] = [];
    var mixedCounts: any[] = [];
    var otherCounts: any[] = [];

    for (let i = 0; i < data_1.length; i++) {
        if (data_1[i]['label'] === "TRUE") {
            trueCounts.push({ "language": data_1[i]['reviewBodyLang'], "counts": data_1[i]['counts'] });
        } else if (data_1[i]['label'] === "FALSE") {
            falseCounts.push({ "language": data_1[i]['reviewBodyLang'], "counts": data_1[i]['counts'] });
        } else if (data_1[i]['label'] === "MIXTURE") {
            mixedCounts.push({ "language": data_1[i]['reviewBodyLang'], "counts": data_1[i]['counts'] });
        } else {
            otherCounts.push({ "language": data_1[i]['reviewBodyLang'], "counts": data_1[i]['counts'] });
        }
    }

    languageNames = Array.from(new Set(trueCounts.map(dictionary => dictionary["language"])
        .concat(falseCounts.map(dictionary => dictionary["language"]))
        .concat(mixedCounts.map(dictionary => dictionary["language"]))
        .concat(otherCounts.map(dictionary => dictionary["language"]))));

    var data: Data[] = [
        {
            name: 'True',
            x: trueCounts.map(dictionary => dictionary["counts"]),
            y: trueCounts.map(dictionary => dictionary["language"]),
            type: 'bar',
            orientation: 'h'
        },
        {
            name: 'False',
            x: falseCounts.map(dictionary => dictionary["counts"]),
            y: falseCounts.map(dictionary => dictionary["language"]),
            type: 'bar',
            orientation: 'h'
        },
        {
            name: 'Mixture',
            x: mixedCounts.map(dictionary => dictionary["counts"]),
            y: mixedCounts.map(dictionary => dictionary["language"]),
            type: 'bar',
            orientation: 'h'
        },
        {
            name: 'Other',
            x: otherCounts.map(dictionary => dictionary["counts"]),
            y: otherCounts.map(dictionary => dictionary["language"]),
            type: 'bar',
            orientation: 'h'
        }
    ];

    const layout: Partial<Layout> = {
        barmode: 'stack',
    };

    const config = {
        responsive: true,
    };

    Plotly.newPlot('graph4', data, layout, config);
  }
}
