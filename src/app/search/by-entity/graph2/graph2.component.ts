import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Plotly, { Data, Layout } from 'plotly.js-basic-dist-min';

@Component({
  selector: 'app-graph2',
  standalone: true,
  imports: [NgIf],
  templateUrl: './graph2.component.html',
  styleUrl: './graph2.component.css'
})
export class Graph2Component implements OnChanges {
  @Input() entityData: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['entityData'] && this.entityData) {
      this.buildChart(this.entityData);
    }
  }

  private buildChart(data1: any): void {
    const values: number[] = [];
    const labels: string[] = ["TRUE", "FALSE", "MIXTURE", "OTHER"];
    const colors: string[] = ['#4CB140', '#A30000', '#519DE9', '#F4C145'];

    // Initialize counts for each label
    const counts: { [key: string]: number } = { "TRUE": 0, "FALSE": 0, "MIXTURE": 0, "OTHER": 0 };

    // Aggregate counts
    for (let i = 0; i < data1.length; i++) {
        const label = data1[i]['label'];
        counts[label] += data1[i]['counts'];
    }

    // Populate values array
    for (const label of labels) {
        values.push(counts[label]);
    }

    const data: Data[] = [{
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
        title: 'Percentage of labels',
        margin: { "t": 50, "b": 50, "l": 50, "r": 200 },
        showlegend: true
        
    };

    var config = { responsive: true }

    Plotly.newPlot('graph2', data, layout, config);
}

}
