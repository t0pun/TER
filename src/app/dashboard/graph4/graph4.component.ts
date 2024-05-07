// import { Component, OnInit, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import Plotly, { Data } from 'plotly.js-basic-dist-min';

// @Component({
//   selector: 'app-graph4',
//   standalone: true,
//   imports: [],
//   templateUrl: './graph4.component.html',
//   styleUrl: './graph4.component.css'
// })
// export class Graph4Component implements OnInit {
//   data2: any;
//   private apiUrl = "http://127.0.0.1:5000/resume";
//   private http = inject(HttpClient)

//   ngOnInit(): void {
//     this.fetchData();
//   }

//   private buildChart(data1: any): void {
//     const nodeData = {
//       type: "sankey",
//       orientation: "h",
//       node: {
//         pad: 15,
//         thickness: 20,
//         line: {
//           color: "black",
//           width: 0.5
//         },
//         label: ["Salaries", "Office", "Merchandise", "Legal", "Q1", "Q2", "Q3", "Q4"],
//         color: ["blue", "green", "purple", "red", "grey", "grey", "grey", "grey"]
//       },
//       link: {
//         source: [0, 1, 2, 3],
//         target: [4, 4, 4, 4],
//         value: [1200000, 20000, 80000, 2000]
//       }
//     };

//     const layout = {
//       title: "Sankey Diagram",
//       font: {
//         size: 10
//       },
//       height: 400,
//       width: 600
//     };

//     Plotly.newPlot("graph4", [nodeData], layout);
//   }
  
//   generateTableData(): any[] {
//     return [
//       { Name: 'John Doe', Age: 30, Country: 'USA' },
//       { Name: 'Jane Smith', Age: 25, Country: 'Canada' },
//       { Name: 'Bob Johnson', Age: 40, Country: 'UK' }
//     ];
//   }

//   fetchData(): void {
//     this.http.get(this.apiUrl).subscribe((res: any) => {
//       this.data2 = res;
//       this.buildChart(this.data2);
//     });
//   }
// }