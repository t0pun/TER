import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Plotly, { Data, Layout } from 'plotly.js-basic-dist-min';

@Component({
  selector: 'app-graph1',
  standalone: true,
  imports: [NgIf],
  templateUrl: './graph1.component.html',
  styleUrls: ['./graph1.component.css']
})
export class Graph1Component implements OnChanges {
  @Input() entityData: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['entityData'] && this.entityData) {
      this.buildChart(this.entityData);
    }
  }

  buildChart(data: any): void {
    const sampleDates: string[] = [];
    const trueCounts: any[] = [];
    const falseCounts: any[] = [];
    const mixedCounts: any[] = [];
    const otherCounts: any[] = [];
    const allCounts: any[] = [];

    // Create a map to track total counts by date
    const totalCountsMap: { [date: string]: number } = {};

    for (let i = 0; i < data.length; i++) {
      const current_date = data[i]['date1'];
      const counts = data[i]['counts'];
      
      sampleDates.push(current_date);
      
      if (data[i]['label'] === 'TRUE') {
        trueCounts.push({ "date1": current_date, "counts": counts });
      } else if (data[i]['label'] === 'FALSE') {
        falseCounts.push({ "date1": current_date, "counts": counts });
      } else if (data[i]['label'] === 'MIXTURE') {
        mixedCounts.push({ "date1": current_date, "counts": counts });
      } else if (data[i]['label'] === 'OTHER') {
        otherCounts.push({ "date1": current_date, "counts": counts });
      }

      // Update total counts for the date
      if (totalCountsMap[current_date]) {
        totalCountsMap[current_date] += counts;
      } else {
        totalCountsMap[current_date] = counts;
      }
    }

    // Convert totalCountsMap to allCounts array
    for (const [date, counts] of Object.entries(totalCountsMap)) {
      allCounts.push({ "date1": date, "counts": counts });
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
        line: { color: '#cc0000' }
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
        mode: 'lines+markers',
        name: 'Total',
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
  downloadTSV(): void {
    const data = this.entityData;
    let tsvContent = "data:text/tab-separated-values;charset=utf-8,";
    tsvContent += "Date\tLabel\tQuantity\n";
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
