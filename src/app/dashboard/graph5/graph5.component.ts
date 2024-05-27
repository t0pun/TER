import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import Plotly, { Data, Layout} from 'plotly.js-basic-dist-min';
declare var cytoscape: any;

@Component({
  selector: 'app-graph5',
  standalone: true,
  imports: [],
  templateUrl: './graph5.component.html',
  styleUrls: ['./graph5.component.css']
})
export class Graph5Component implements OnInit {

  data: any
  
  ngOnInit() {
 
  }



  downloadTSV(): void {
    const data = this.data;
    let tsvContent = "data:text/tab-separated-values;charset=utf-8,";

    data.forEach((row: any) => {
      const rowArray = [row['entity'], row['counts']];
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