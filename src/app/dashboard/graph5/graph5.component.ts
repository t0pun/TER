import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { DataSet, Network, Edge, Node } from 'vis-network/standalone/esm/vis-network';

interface GraphData {
  nodes: Node[];
  edges: Edge[];
}



@Component({
  selector: 'app-graph5',
  standalone: true,
  templateUrl: './graph5.component.html',
  styleUrls: ['./graph5.component.css']
})
export class Graph5Component implements OnInit, AfterViewInit {

  constructor(private http: HttpClient) { }


  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.createGraph();
  }

  createGraph(): void {
    this.http.get<GraphData>('http://localhost:5000/graph-data').subscribe(data => {
      const nodes = new DataSet<Node>(data.nodes);
      const edges = new DataSet<Edge>(data.edges);

      const container = document.getElementById('vis-graph') as HTMLElement;
      const graphData = { nodes, edges };
      const options = {};

      new Network(container, graphData, options);
    });

  }
  
}

