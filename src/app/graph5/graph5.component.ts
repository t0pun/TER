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
    this.loadScripts().then(() => {
      this.initCytoscape();
    }).catch((error) => {
      console.error('Error loading scripts:', error);
    });
  }
  
  loadScripts(): Promise<void> {
    return Promise.all([
      this.loadScript('https://unpkg.com/layout-base/layout-base.js'),
      this.loadScript('https://unpkg.com/cose-base/cose-base.js'),
      this.loadScript('https://unpkg.com/cytoscape-fcose/cytoscape-fcose.js'),
      this.loadScript('https://unpkg.com/cytoscape-cose-bilkent/cytoscape-cose-bilkent.js')
    ]).then(() => {
      cytoscape.use(require('cytoscape-cose-bilkent'));
    });
  }
  
  loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.body.appendChild(script);
    });
  }
  
  initCytoscape() {
    this.cy = cytoscape({
      // ...
      layout: {
        name: 'cose-bilkent',
        // Paramètres du layout 'cose-bilkent'
        // ...
      }
    });
  }
  createCytoscapeGraph() {
    // Données du graphe
    const elements = [
      { data: { id: 'n1', label: 'Node 1' } },
      { data: { id: 'n2', label: 'Node 2' } },
      { data: { id: 'n6', label: 'Node 6' } },
      { data: { id: 'n3', label: 'Node 3' } },
      { data: { id: 'n4', label: 'Node 4' } },
      { data: { id: 'n5', label: 'Node 5' } },
      
      { data: { source: 'n1', target: 'n2', label: 'Edge 1' } },
      { data: { source: 'n2', target: 'n6', label: 'Edge 6' } },
      { data: { source: 'n2', target: 'n3', label: 'Edge 2' } },
      { data: { source: 'n3', target: 'n4', label: 'Edge 3' } },
      { data: { source: 'n4', target: 'n5', label: 'Edge 4' } },
      { data: { source: 'n1', target: 'n5', label: 'Edge 5' } }
    ];

    // Initialisation de Cytoscape
    const cy = cytoscape({
      container: document.getElementById('cy'),
      elements: elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#FFCE00',
            'label': 'data(label)'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#7C7C7C',
            'target-arrow-color': '#7C7C7C',
            'target-arrow-shape': 'triangle',
            'label': 'data(label)'
          }
        }
      ],
    });
  }
}