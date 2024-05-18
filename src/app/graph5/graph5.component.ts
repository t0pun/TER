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

  cy: any
  
  ngOnInit() {
 
  }

}